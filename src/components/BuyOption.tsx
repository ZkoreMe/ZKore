import { FC } from "react";
import Image from "next/image";
import Link from "next/link";

interface PayReview {
  id: number;
  user: string;
  name: string;
  date: string;
  img: string;
  title: string;
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
}

interface CardUserReviewProps {
  payR: PayReview;
}

const BuyOption: FC<CardUserReviewProps> = ({ payR }) => {
  const save = payR.firstprice - payR.price;
  const discount = (save / payR.firstprice) * 100;
  const discountRounded = discount.toFixed(2);
  return (
    <div className="flex flex-col gap-[36px] items-center">
      <div className="w-[340px]  h-[211px] border-[2px] border-solid border-[#000] rounded-[8px] bg-[#FDFDFD] p-[12px] items-center justify-center ">
        <div className="flex justify-between">
          <h1 className="text-[18px] font-medium text-[#010100]">
            Exclusive Offer
          </h1>
          <span className="text-[#292824] font-medium text-[14px]">
            {payR.time}
          </span>
        </div>
        <div>
          <div className="flex flex-col gap-[16px] mt-[15px]">
            <span className="text-[#E04330] text-[47px] font-medium">
              ${payR.price}
            </span>
            <div className="flex justify-between text-[14px] font-medium text-[#010100]">
              <h1 className="">Original price</h1>
              <p>${payR.firstprice}.00</p>
            </div>
            <div className="flex justify-between text-[14px] font-medium text-[#010100]">
              <h1 className="">Referral discount</h1>
              <p>
                {`( save $${save}) `} {discountRounded}%{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
      <Link href={`/solanapay/${payR.id}`}>
        <div className=" flex justify-center items-center gap-[12px] w-[340px] rounded-[8px] shadow-custom border-[2px] border-solid border-[#000] h-[48px] bg-[#FED302]">
          <i
            className="ri-coins-line text-[#010100]"
            style={{ fontSize: "24px" }}
          ></i>
          <button className="text-[16px] font-medium text-[#010100]">
            SOLANA PAY
          </button>
        </div>
      </Link>
      <Link href={payR.referral}>
        <div className=" flex justify-center items-center gap-[12px] w-[340px] rounded-[8px] shadow-custom border-[2px] border-solid border-[#000] h-[48px] bg-[#93A6EC]">
          <i
            className="ri-store-line text-[#010100]"
            style={{ fontSize: "24px" }}
          ></i>
          <button className="text-[16px] font-medium text-[#010100]">
            PAY ON STORE
          </button>
        </div>
      </Link>
    </div>
  );
};

export default BuyOption;
