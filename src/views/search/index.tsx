// Next, React
import { FC, useEffect, useState } from "react";
import SearchBar from "components/SearchBar";
import Offers from "components/Offers";
import CardReview from "components/CardReview";

export const Search: FC = ({}) => {

  return (
    <div className="mt-[20.65px]">
      <SearchBar />

      <div className="mt-[36px] flex flex-col items-center gap-[20px]">
        <h1 className="text-[#010100] text-[18px] font-bold">
          Deal Opportunities
        </h1>
        <div className="flex w-[340px] overflow-scroll ">
          <Offers />
        </div>
        <span className="relative justify-center flex gap-[4px] font-normal  text-[#292824] text-[14px] items-center">
          <p>Show more discounts</p>
          <i className="ri-arrow-down-s-line " style={{ fontSize: "18px" }}></i>
        </span>
      </div>
      <div className=" text-center mt-[32px] font-bold text-[18px] not-italic text-[#010100] leading-relaxed">
        <h1>Recent Activity</h1>
      </div>
      <div className="mt-[24px]">
        <CardReview/>
      </div>
      <div>
        <span className="relative justify-center flex gap-[4px] mt-[24px] text-[#292824] text-[14px] items-center mb-[45px]">
          <p>Show more activity</p>
          <i className="ri-arrow-down-s-line " style={{ fontSize: "18px" }}></i>
        </span>
      </div>
    </div>
  );
};
