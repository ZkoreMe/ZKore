// Next, React
import { FC, useEffect, useState } from "react";
import reviewData from "data/reviewData";
import payData from "data/payData";
import Image from "next/image";
import { ReviewDetails } from "types/reviewTypes";
import { PayProduct } from "types/payTypes";
import TransactionSuccessful from "components/TransactionSuccessful";

interface ReviewDetailProps {
  paysolId: number | undefined;
}

export const PaySolConfirmed: FC<ReviewDetailProps> = ({ paysolId }) => {
 

  return (
    <div className="mt-[36px] ml-[25px] mr-[25px] flex flex-col gap-[20px] justify-center items-center">
      <TransactionSuccessful paysolId={paysolId}/>
    </div>
  );
};
