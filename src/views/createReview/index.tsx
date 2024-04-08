import { FC, useEffect, useCallback } from "react";

import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { Keypair, SystemProgram, Transaction, TransactionMessage, TransactionSignature, TransactionInstruction, PublicKey } from '@solana/web3.js';
import { notify } from "utils/notifications";
import { PROGRAM_ID } from "constants/addresses";

export const CreateReview: FC = () => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();

  useEffect(() => {
    if (publicKey) {
      console.log(publicKey.toBase58());
    }
  }, [publicKey, connection]);

  const handleClick = useCallback(async () => {
    if (!publicKey) {
      notify({ type: 'error', message: `Wallet not connected!` });
      console.log('error', `Send Transaction: Wallet not connected!`);
      return;
    }

    let signature: TransactionSignature = '';
    try {
      // Replace the account key with your actual account key

      // Construct the transaction instruction
      const instruction = new TransactionInstruction({
        keys: [{ pubkey: publicKey, isSigner: true, isWritable: false }],
        programId: PROGRAM_ID,
        data: Buffer.alloc(0), // No data needed for this instruction
      });

      // Create a transaction object
      const transaction = new Transaction().add(instruction);

      // Sign and send the transaction
      const signature = await window.solana.signAndSendTransaction(transaction);

      // Log the transaction signature
      console.log('Transaction signature:', signature);
    } catch (error) {
      console.error('Error:', error);
    }
  }, [publicKey, notify, connection, sendTransaction]);


  return (
    <div className="w-full relative bg-light-main-background overflow-hidden flex flex-col items-start justify-start pt-3 pb-[38px] pr-[7px] pl-2 box-border gap-[27px] tracking-[normal] text-center text-[17px] text-light-main-text font-sf-pro">
      <section className="self-stretch flex flex-row items-start justify-start py-0 pr-[18px] pl-[17px] box-border max-w-full text-left text-2xl text-light-icon-button font-p-med-16">
        <div className="flex-1 flex flex-col items-center justify-start gap-[36px] max-w-full">
          <div className="self-stretch flex flex-col items-start justify-start gap-[20px] max-w-full">
            <div className="self-stretch h-[29px] flex flex-row items-center justify-start gap-[4px]">
              <h3 className="m-0 flex-1 relative text-inherit leading-[140%] font-medium font-inherit">
                Macbook Air M3
              </h3>
            </div>
            <div className="h-9 flex flex-row items-center justify-start gap-[12px]">
              <i
                className="ri-star-line text-[#FA5D31]"
                style={{ fontSize: "18px" }}
              ></i>
              <i
                className="ri-star-line text-[#FA5D31]"
                style={{ fontSize: "18px" }}
              ></i>
              <i
                className="ri-star-line text-[#FA5D31]"
                style={{ fontSize: "18px" }}
              ></i>
              <i
                className="ri-star-line text-[#FA5D31]"
                style={{ fontSize: "18px" }}
              ></i>
              <i
                className="ri-star-line text-[#FA5D31]"
                style={{ fontSize: "18px" }}
              ></i>
            </div>
            <div className="self-stretch flex flex-row items-center justify-start max-w-full text-sm">
              <div className="flex-1 relative leading-[20px] inline-block max-w-full">
                A few things to consider in your review
              </div>
            </div>
            <div className="w-[280px] flex flex-row items-start justify-start gap-[20px]">
              <button className="cursor-pointer py-2 px-[13px] bg-[transparent] flex-1 rounded-lg flex flex-row items-center justify-center border-[2px] border-dashed border-light-main-text">
                <div className="relative text-sm leading-[20px] font-medium font-p-med-16 text-light-icon-button text-left inline-block min-w-[49px]">
                  Quality
                </div>
              </button>
              <button className="cursor-pointer py-2 px-[13px] bg-[transparent] flex-1 rounded-lg flex flex-row items-center justify-center border-[2px] border-dashed border-light-main-text">
                <div className="relative text-sm leading-[20px] font-medium font-p-med-16 text-light-icon-button text-left inline-block min-w-[50px]">
                  Service
                </div>
              </button>
              <button className="cursor-pointer py-2 px-[19px] bg-[transparent] flex-[0.76] rounded-lg flex flex-row items-center justify-center border-[2px] border-dashed border-light-main-text">
                <div className="relative text-sm leading-[20px] font-medium font-p-med-16 text-light-icon-button text-left inline-block min-w-[37px]">
                  Value
                </div>
              </button>
            </div>
          </div>
          <div className="self-stretch h-12 rounded-lg bg-light-main-background box-border flex flex-row items-center justify-center py-3 px-3.5 opacity-[0.8] border-[2px] border-solid border-light-main-text">
            <div className="self-stretch flex-1 flex flex-row items-center justify-center">
              <div className="self-stretch flex-1 flex flex-row items-center justify-between gap-[20px]">
                <input
                  className="w-[81px] [border:none] [outline:none] bg-[transparent] h-[17px] flex flex-row items-center justify-start font-p-med-16 font-medium text-[12px] text-light-icon-button"
                  placeholder="Write review..."
                  type="text"
                />
                <i
                  className="ri-camera-line text-[#FA5D31]"
                  style={{ fontSize: "18px" }}
                ></i>
              </div>
            </div>
          </div>
          <div className="self-stretch flex flex-col items-center justify-start gap-[24px]">
            <button onClick={handleClick} className="cursor-pointer py-3 px-5 bg-main-yellow self-stretch h-12 rounded-lg shadow-[2px_2px_1px_#000] box-border flex flex-row items-center justify-center gap-[12px] whitespace-nowrap border-[2px] border-solid border-light-main-text">
              <i
                className="ri-award-line text-[#FA5D31]"
                style={{ fontSize: "18px" }}
              ></i>
              <b className="relative text-base leading-[140%] inline-block font-p-med-16 text-light-icon-button text-left min-w-[100px]">
                POST REVIEW
              </b>
            </button>
            <button className="cursor-pointer py-3 px-5 bg-main-blue self-stretch h-12 rounded-lg shadow-[2px_2px_0px_#000] box-border flex flex-row items-center justify-center gap-[12px] whitespace-nowrap border-[2px] border-solid border-light-main-text">
              <i
                className="ri-medal-line text-[#FA5D31]"
                style={{ fontSize: "18px" }}
              ></i>
              <div className="relative text-base leading-[140%] font-medium font-p-med-16 text-light-main-text text-left">
                VERIFY PURCHASE
              </div>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
