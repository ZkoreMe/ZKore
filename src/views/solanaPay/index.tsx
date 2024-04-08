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
import { shopAddress, usdcAddress } from "../../constants/addresses";
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
    // Obtiene el valor de la opción seleccionada.
    const selectedValue = e.target.value;

    // Verifica si el valor seleccionado es "Solana".
    if (selectedValue === "Solana") {
      upgradeData();
    }
  };

  const [start, setStart] = useState(false);
  const router = useRouter();
  const qrRef = useRef<HTMLDivElement>(null);
  const reference = useMemo(() => Keypair.generate().publicKey, []);
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = clusterApiUrl(network);
  const connection = new Connection(endpoint);

  function upgradeData() {
    const urlParams: TransferRequestURLFields = {
      recipient: shopAddress,
      splToken: usdcAddress,
      amount: amount,
      reference,
      label: "Zkore",
      message: "Thank you for your purchase!",
    };

    const url = encodeURL(urlParams);
    console.log(url);
    const qr = createQR(url, 260, "transparent");

    if (qrRef.current && amount.isGreaterThan(0)) {
      qrRef.current.innerHTML = "";
      qr.append(qrRef.current);
      setStart(true);
      // Aquí añades el setTimeout para redirigir después de 15 segundos
      /** setTimeout(() => {
        router.push(`/solpayconfirmed/${review?.id}`);
      }, 15000); // 15000 milisegundos equivalen a 15 segundos */
    }
  }

  console.log(reference);
  useEffect(() => {
    let retryTimeoutId;
    let navigationTimeoutId; // Additional timeout ID for navigation fallback
    let retryDelay = 1000; // Starts with 1 second
    let totalTimeElapsed = 0; // Adds a total time accumulator
    const maxDelay = 60000; // Maximum wait time adjusted to 1 minute
    const navigationFallbackDelay = 32000; // Fallback navigation delay set to 32 seconds

    const verifyTransaction = async () => {
      console.log("Inside verifyTransaction");
      try {
        const signatureInfo = await findReference(connection, reference, {
          finality: "finalized",
        });
        console.log("After calling findReference");
        console.log("signatureInfo:", signatureInfo);
        console.log(signatureInfo);

        await validateTransfer(
          connection,
          signatureInfo.signature,
          {
            recipient: shopAddress,
            amount: amount,
            splToken: usdcAddress,
            reference,
          },
          { commitment: "finalized" }
        );

        console.log("Transacción validada con éxito");
        clearTimeout(navigationTimeoutId);
        setStart(false);
        router.push(`/solpayconfirmed/${review.id}`);
        retryDelay = 10000; // Restablece para futuras verificaciones
      } catch (e) {
        console.error("Error en verifyTransaction:", e);
        if (e instanceof FindReferenceError) {
          console.log("Transacción no encontrada, reintentando...");
        } else if (
          e instanceof ValidateTransferError ||
          e.message.includes("429")
        ) {
          console.error(
            `Demasiadas solicitudes, reintentando con ${retryDelay}ms de delay...`
          );
        } else {
          console.error("Error verificando la transacción", e);
          setStart(false); // Detiene la verificación
          return;
        }

        totalTimeElapsed += retryDelay;
        if (totalTimeElapsed >= maxDelay) {
          console.log(
            "Máximo tiempo de espera alcanzado, ofreciendo reintento..."
          );
          setStart(false); // Detiene la verificación
          // Aquí puedes actualizar el estado para mostrar la opción de generar un nuevo QR
          return;
        }
        retryTimeoutId = setTimeout(verifyTransaction, retryDelay);
        retryDelay = Math.min(maxDelay, retryDelay * 2); // Aumenta el delay para el próximo reintento
      }
    };

    if (start) {
      verifyTransaction();
    }

    console.log("After calling verifyTransaction");
    navigationTimeoutId = setTimeout(() => {
      console.log("Navigating due to timeout...");
      router.push(`/solpayconfirmed/${review.id}`);
    }, navigationFallbackDelay);

    // Limpieza: Cancelar el timeout si el componente se desmonta o si 'start' cambia a false.
    return () => {
      clearTimeout(retryTimeoutId);
      clearTimeout(navigationTimeoutId); // Make sure to clear this timeout as well
    };
  }, [start, review, connection, reference, router]); // Asegúrate de incluir 'value' y 'review' en las dependencias

  return (
    <div className="flex flex-col items-center gap-8 mt-[42.5px] mb-[48.5px]">
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
