// Next, React
import { FC, useEffect, useState } from "react";
import Link from "next/link";

// Wallet
import { useWallet, useConnection } from "@solana/wallet-adapter-react";

// Components
import { RequestAirdrop } from "../../components/RequestAirdrop";
import pkg from "../../../package.json";

// Store
import useUserSOLBalanceStore from "../../stores/useUserSOLBalanceStore";

export const HomeView: FC = ({}) => {
  const wallet = useWallet();
  const { connection } = useConnection();

  const balance = useUserSOLBalanceStore((s) => s.balance);
  const { getUserSOLBalance } = useUserSOLBalanceStore();

  useEffect(() => {
    if (wallet.publicKey) {
      console.log(wallet.publicKey.toBase58());
      getUserSOLBalance(wallet.publicKey, connection);
    }
  }, [wallet.publicKey, connection, getUserSOLBalance]);

  return (
    <div className="md:hero mx-auto p-4">
      <div className="flex flex-col items-center justify-center mt-[50px] gap-10">
        <Link href={"/search"}>
          <div className="relative w-[340px] h-[44px] rounded-[8px] bg-[#047BE9] flex items-center justify-center gap-[12px]">
            <i
              className="ri-search-2-line text-[#FFFFFF]"
              style={{ fontSize: "24px" }}
            ></i>
            <button className="bg-transparent text-[14px] font-medium text-[#FFFFFF] focus:outline-none">
              Search
            </button>
          </div>
        </Link>
        <h4 className="md:w-full text-2xl text-slate-300 my-2">
          {wallet && (
            <div className="flex flex-row justify-center">
              <div>{(balance || 0).toLocaleString()}</div>
              <div className="text-slate-600 ml-2">SOL</div>
            </div>
          )}
        </h4>
      </div>
    </div>
  );
};
