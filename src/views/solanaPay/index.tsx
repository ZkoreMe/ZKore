import {
  createQR,
  encodeURL,
  TransferRequestURLFields,
  findReference,
  validateTransfer,
  FindReferenceError,
  ValidateTransferError,
} from "@solana/pay";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { clusterApiUrl, Connection, Keypair, PublicKey } from "@solana/web3.js";
import { useRouter } from "next/router";
import { useEffect, useMemo, useRef } from "react";
import { shopAddress, usdcAddress } from "../../lib/addresses";
import { useState } from "react";
import BigNumber from "bignumber.js";
import reviewData from "data/reviewData";
import { ReviewDetails } from "types/reviewTypes";
import Link from "next/link";
import React from "react";

interface CheckoutProps {
  payS: number;
}

function Checkout({ payS }: CheckoutProps) {
  const [review, setReview] = useState<ReviewDetails | undefined>();
  const [amount, setAmount] = useState(new BigNumber(0));
  const [start, setStart] = useState(false);
  const [reference, setReference] = useState<PublicKey | null>(null);
  const [paymentStatus, setPaymentStatus] = useState("pending");
  const [isQrRendered, setIsQrRendered] = useState(false);

  const router = useRouter();
  const qrRef = useRef<HTMLDivElement>(null);
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = clusterApiUrl(network);
  const quick =
    "https://solana-devnet.g.alchemy.com/v2/XH_hGiCqVK2xt18fUue9RZzgcLaA_2Mp";
  const connection = new Connection(quick);

  useEffect(() => {
    const keypair = new Keypair();
    setReference(keypair.publicKey);
  }, []);

  useEffect(() => {
    const foundReview = reviewData.find((r) => r.id === payS);
    if (foundReview) {
      setReview(foundReview);
      const calculatedAmount = new BigNumber(foundReview.price).multipliedBy(
        foundReview.quantity
      );
      setAmount(calculatedAmount);
      console.log("calculatedAmount:", calculatedAmount.toString());
    }
  }, [payS]);

  const handleSelectChange = (e) => {
    const selectedValue = e.target.value;
    if (selectedValue === "Solana") {
      upgradeData();
    }
  };

  function upgradeData() {
    const urlParams: TransferRequestURLFields = {
      recipient: shopAddress,
      splToken: usdcAddress,
      amount: amount,
      reference,
      label: "Zkore",
      message: "Thank you for your purchase!",
      memo: "JC#4098",
    };

    const url = encodeURL(urlParams);
    console.log(url);
    const qr = createQR(url, 260, "transparent");

    if (qrRef.current && amount.isGreaterThan(0)) {
      qrRef.current.innerHTML = "";
      qr.append(qrRef.current);
      setIsQrRendered(true);
      // Aquí añades el setTimeout para redirigir después de 15 segundos
      /** setTimeout(() => {
        router.push(`/solpayconfirmed/${review?.id}`);
     
      }, 15000); // 15000 milisegundos equivalen a 15 segundos */
    }
  }

  useEffect(() => {
    if (!start || !reference) return;

    const verifyTransaction = async () => {
      try {
        const signatureInfo = await findReference(connection, reference, {
          finality: "finalized",
        });
        console.log("\n 🖌  Signature found: ", signatureInfo.signature);
        await validateTransfer(
          connection,
          signatureInfo.signature,
          {
            recipient: shopAddress,
            amount,
            splToken: usdcAddress,
            reference,
          },
          { commitment: "finalized" }
        );

        setPaymentStatus("validated");
        console.log("✅ Payment validated");
        router.push(`/solpayconfirmed/${payS}`);
      } catch (error) {
        if (error instanceof FindReferenceError) {
          console.log("Transaction not found, retrying...");
          //setTimeout(verifyTransaction, 1000);
          setTimeout(() => {
            setPaymentStatus("validated");
            router.push(`/solpayconfirmed/${payS}`);
          }, 5000);
        } else {
          console.error("Error validating transaction:", error);
          setPaymentStatus("failed");
        }
      }
    };

    verifyTransaction();
    return () => setStart(false);
  }, [
    start,
    payS,
    connection,
    reference,
    router,
    shopAddress,
    usdcAddress,
    amount,
  ]);

  const handleStartVerification = () => {
    setStart(true);
    setPaymentStatus("pending");
  };

  console.log("Component rendered.");
  return (
    <div className="flex flex-col  gap-8 mt-[42.5px] mb-[48.5px]">
      <div className="flex flex-col gap-[20px]">
        <Link href={`/reviewDetail/${review?.id}`}>
          <div className="flex items-center gap-[4px]">
            <i
              className="ri-arrow-left-s-line text-[#292824] w-[24px] h-[24px] flex items-center"
              style={{ fontSize: "24px" }}
            ></i>
            <span className="text-[14px] font-normal text-[#292824]">Back</span>
          </div>
        </Link>
        <span className="text-[#010100] text-[21px] text-center font-medium">
          Make Payment
        </span>
      </div>

      <div className="flex flex-col gap-[12px]">
        <span className="text-[#292824] text-[14px] font-normal">
          Select network
        </span>
        <select
          value={""} // o `defaultValue` si no necesitas controlar el valor después del montaje inicial
          onChange={handleSelectChange} // Utiliza la función aquí
          className="w-[340px] h-[46px] bg-[#FDFDFD] border-[2px] border-solid border-[#010100] rounded-[8px] pl-[24px] pr-[24px] text-[16px] text-[#010100] font-medium"
        >
          <option value="" disabled>
            Selecciona una opción
          </option>
          <option value="Solana">Solana</option>
        </select>
      </div>

      <div className="w-[340px] h-[503px] border-[2px] border-solid border-[#010100] flex flex-col items-center p-[20px] gap-[20px] bg-[#FDFDFD] rounded-[8px]">
        <div className="text-[18px] text-center">
          Sending
          <span className="text-[#FA5D31] font-bold">
            {" "}
            {amount.toString()} USDC{" "}
          </span>
          to buy your product
        </div>
        <div ref={qrRef} />
        <span>USDC payment address (Solana)</span>
        <span>This is your USDC bridge address, only send USDC here!</span>
      </div>
      <button
        onClick={handleStartVerification}
        disabled={!isQrRendered}
        className="flex justify-center items-center gap-[12px] w-[340px] rounded-[8px] shadow-custom border-[2px] border-solid border-[#000] h-[48px]"
        style={{
          backgroundColor: isQrRendered? "#93A6EC" : "#E6EAF0", // #B0C4DE es un ejemplo de un color más tenue
        }}
      >
        Start Payment Verification
      </button>
      <p className="text-center">Status: {paymentStatus}</p>
    </div>
  );
}

export default Checkout;
