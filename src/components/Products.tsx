import { FC, useState } from "react";
import productData from "data/productData";
import Image from "next/image";

const Products: FC = () => {

    console.log(productData)
  return (
    <div className="flex gap-[24px]">
    {productData.map((product)=>(
        <div className="w-[193px] bg-[#FFF] h-[110px] border-[2px] border-solid border-[#292824] rounded-[8px] gap-[24px] flex items-center justify-center" key={product.id}>
            <Image src={product.img} alt="" width={60} height={60}/>
            <div className="flex flex-col gap-[4px]">
               <h1 className="text-[21px] font-bold text-[#010100]">{product.brand}</h1>
            </div>
        </div>
    )
    )}
    </div>
  );
};

export default Products;
