// Next, React
import { FC, useEffect, useState } from "react";
import SearchBar from "components/SearchBar";
import Products from "components/Products";
import CategoryCard from "components/CategoryCard";

export const SearchProducts: FC = ({}) => {
  return (
    <div className="mt-[20.65px]">
      <SearchBar />
      <div className="flex w-[340px] overflow-scroll mt-[24px]">
        <CategoryCard />
      </div>

      <div className="mt-[36px] flex flex-col items-center gap-[20px]">
        <h1 className="text-[#010100] text-[18px] font-bold">
          Suggested Products
        </h1>
        <div className="flex w-[340px] overflow-scroll ">
          <Products />
        </div>
        <span className="relative justify-center flex gap-[4px] font-normal  text-[#292824] text-[14px] items-center">
          <p>Show more products</p>
          <i className="ri-arrow-down-s-line " style={{ fontSize: "18px" }}></i>
        </span>
      </div>
    </div>
  );
};
