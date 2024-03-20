import { FC, useState } from "react";
import categoryData from "data/categoryData";

const SearchBar: FC = () => {
  return (
    <div className="flex flex-col gap-[24px] items-center justify-center mt-[24px]">
      <div className="relative bg-[#E8E8E8] rounded-[8px] w-[340px] h-[44px] flex items-center">
        <input
          type="text"
          placeholder="I’m looking for..."
          className="bg-transparent p-[12px] pl-[12px] rounded-[8px] w-full h-full text-[14px] focus:outline-none"
        />
        <i
          className="ri-arrow-down-s-fill absolute right-4 text-[#777E90]"
          style={{ fontSize: "18px" }}
        ></i>
      </div>
      <div className="relative w-[340px] h-[44px] rounded-[8px] bg-[#047BE9] flex items-center justify-center gap-[12px]">
        <i
          className="ri-search-2-line text-[#FFFFFF]"
          style={{ fontSize: "24px" }}
        ></i>
        <button className="bg-transparent text-[14px] font-medium text-[#FFFFFF] focus:outline-none">
          Search
        </button>
      </div>
      <div className="grid grid-cols-3 gap-[20px]">
        {categoryData.map((category) => (
          <div
            key={category.id}
            className="w-[100px] h-[71px} flex flex-col items-center gap-[12px] bg-[#E8E8E8] rounded-[8px] p-[12px] text-[#777E90]"
          >
            <i className={`${category.icon}`} style={{ fontSize: "18px" }}></i>
            <h1 className="text-[12px] font-medium">{category.category}</h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;
