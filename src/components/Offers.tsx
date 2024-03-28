import { FC, useState } from "react";
import offerData from "data/offerData";
import Image from "next/image";

const Offers: FC = () => {

    console.log(offerData)
  return (
    <div className="flex gap-[24px]">
    {offerData.map((offer)=>(
        <div className="w-[193px] bg-[#FFF] h-[110px] border-[2px] border-solid border-[#292824] rounded-[8px] gap-[24px] flex items-center justify-center" key={offer.id}>
            <Image src={offer.icon} alt="" width={60} height={60}/>
            <div className="flex flex-col gap-[4px]">
               <h1 className="text-[21px] font-bold text-[#010100]">{offer.brand}</h1>
               <h1 className="text-[21px] text-[#E04330] font-bold">{offer.offer}% OFF</h1>
               <h1 className="text-[14px] text-[#E04330] font-normal border-b-[1px] border-solid border-[#FA5D31]">{offer.coupon} Coupons</h1> 
            </div>
        </div>
    )
    )}
    </div>
  );
};

export default Offers;
