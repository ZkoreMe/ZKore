import { FC, useState } from "react";
import categoryData from "data/categoryData";
import reviewData from "data/reviewData";

const CategoryCard: FC = () => {
  const review = reviewData;
  return (
    <div className="flex gap-[24px]">
      {categoryData.map((category) => (
        <div
          key={category.id}
          className="w-[80px] h-[36px] flex items-center justify-center gap-[12px] bg-[#FDFDFD] rounded-[8px] border-[2px] border-solid border-[#010100] text-[#292824]"
        >
          <h1 className="text-[14px] font-medium">{category.category}</h1>
        </div>
      ))}
    </div>
  );
};

export default CategoryCard;
