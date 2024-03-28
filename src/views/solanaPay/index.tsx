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
import { clusterApiUrl, Connection, Keypair } from "@solana/web3.js";
import { useRouter } from "next/router";
import { useEffect, useMemo, useRef } from "react";
import { shopAddress, usdcAddress } from "../../lib/addresses";
import calculatePrice from "../../lib/calculatePrice";
import { useState } from "react";
import BigNumber from "bignumber.js";
import reviewData from "data/reviewData";
import { ReviewDetails } from "types/reviewTypes";
import Link from "next/link";

interface PaySolReview {
  id: number;
  user: string;
  name: string;
  date: string;
  img: string;
  tittle: string;
  rate: number;
  description: string;
  like: number;
  dislike: number;
  referral: string;
  img2: string[];
  payId: number;
  price: number;
  discount: number;
  url: string;
  time: string;
  firstprice: number;
  quantity: number;
}

interface CheckoutProps {
  payS: number;
}

// Cambiado a la declaración de función directa
function Checkout({ payS }: CheckoutProps) {
  const [review, setReview] = useState<ReviewDetails | undefined>();

  useEffect(() => {
    if (typeof payS === "number") {
      const foundReview = reviewData.find((Review) => Review.id === payS);
      setReview(foundReview);
    }
  }, [payS]);

  console.log(review?.id);

  const [value, setValue] = useState("1");
  const [start, setStart] = useState(false);
  const [count, setCount] = useState(0);
  const [amount, setAmount] = useState(new BigNumber(0));

  const router = useRouter();
  const qrRef = useRef<HTMLDivElement>(null); // ref to a div where we'll show the QR code
  const reference = useMemo(() => Keypair.generate().publicKey, []); // Unique address that we can listen for payments to
  const network = WalletAdapterNetwork.Devnet; // TODO Mainnet
  const endpoint = clusterApiUrl(network);
  const connection = new Connection(endpoint);

  const handleSelectChange = (e) => {
    // Obtiene el valor de la opción seleccionada.
    const selectedValue = e.target.value;
  
    // Verifica si el valor seleccionado es "Solana".
    if (selectedValue === "Solana") {
      upgradeData();
    }
  };
  

  useEffect(() => {
    if (review) {
      // Suponiendo que review incluye los detalles necesarios para el cálculo
      const newAmount = new BigNumber(review.price).multipliedBy(
        review.quantity
      );
      setAmount(newAmount);
    }
  }, [review]);

  function checkPrice() {
    let newPrice = new BigNumber(0);
    if (review) {
      // Multiplica el precio unitario por la cantidad seleccionada.
      newPrice = new BigNumber(review.price).multipliedBy(value);
    }
    return newPrice;
  }

  function upgradeData() {
    console.log("count", count);
    let new_amount = checkPrice(); // Obtiene el nuevo precio calculado

    // Usa setAmount para actualizar el estado de amount con el nuevo valor calculado
    setAmount(new_amount);

    const urlParams: TransferRequestURLFields = {
      recipient: shopAddress,
      splToken: usdcAddress,
      amount: new_amount,
      reference,
      label: "Zkore",
      message: "Thank you for your purchase!",
    };

    const url = encodeURL(urlParams);
    const qr = createQR(url, 260, "transparent");

    if (qrRef.current && new_amount.isGreaterThan(0)) {
      qrRef.current.innerHTML = "";
      qr.append(qrRef.current);
      setStart(true);
    }
  }

  useEffect(() => {
    console.log(count);
  }, [count]);

  // Check every 0.5s if the transaction is completed
  useEffect(() => {
    if (start) {
      const interval = setInterval(async () => {
        try {
          const signatureInfo = await findReference(connection, reference, {
            finality: "confirmed",
          });
          const newAmount = checkPrice();
          setAmount(newAmount); // Actualiza el estado usando setAmount

          await validateTransfer(
            connection,
            signatureInfo.signature,
            {
              recipient: shopAddress,
              amount,
              splToken: usdcAddress,
              reference,
            },
            { commitment: "confirmed" }
          );

          if (+count < +value) {
            setStart(false);
            setCount(count + 1);
            console.log(count);
          } else {
            router.push("/confirmed");
          }
        } catch (e) {
          if (e instanceof FindReferenceError) {
            // No transaction found yet, ignore this error
            return;
          }
          if (e instanceof ValidateTransferError) {
            // Transaction is invalid
            console.error("Transaction is invalid", e);
            return;
          }
          console.error("Unknown error", e);
        }
      }, 500);
      return () => {
        clearInterval(interval);
      };
    }
  }, [amount, start, count]);

  return (
    <div className="flex flex-col items-center gap-8 mt-[42.5px]">
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
        <span className="text-[#010100] text-[21px] font-medium">
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
    </div>
  );
}

export default Checkout;
