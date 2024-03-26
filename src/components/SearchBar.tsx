import { FC, useState } from "react";
import categoryData from "data/categoryData";

const SearchBar: FC = () => {
  return (
    <div className="flex flex-col gap-[24px] items-center justify-center">
      <div className="relative bg-[#FDFDFD] rounded-[8px] w-[340px] h-[46px] flex items-center">
        <input
          type="text"
          placeholder="I’m looking for..."
          className="bg-transparent p-[24px] pl-[24px] pt-[12px] pb-[12px] rounded-[8px] w-full h-full text-[14px] focus:outline-none border-[2px] border-solid border-[#010100] placeholder:text-[16px] placeholder:font-normal placeholder:text-[#777E90]"
        />
        <i
          className="ri-arrow-down-s-fill absolute right-4 text-[#777E90]"
          style={{ fontSize: "18px" }}
        ></i>
      </div>
      <div className="relative w-[340px] h-[48px] rounded-[8px] bg-[#FED302] shadow-custom border-[2px] border-solid border-[#010100] flex items-center justify-center gap-[12px]">
        <i
          className="ri-search-2-line text-[#010100]"
          style={{ fontSize: "24px" }}
        ></i>
        <button className="bg-transparent text-[16px] font-medium text-[#010100] focus:outline-none">
          SEARCH
        </button>
      </div>
      <div className="grid grid-cols-3 gap-x-[20px] gap-y-[24px]">
        {categoryData.map((category) => (
          <div
            key={category.id}
            className="w-[100px] h-[74px] flex flex-col items-center justify-center gap-[12px] bg-[#FDFDFD] rounded-[8px] border-[2px] border-solid border-[#010100] text-[#292824]"
          >
            <i className={`${category.icon} w-[18px] h-[18px]`} style={{ fontSize: "18px" }}></i>
            <h1 className="text-[14px] font-medium">{category.category}</h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;
