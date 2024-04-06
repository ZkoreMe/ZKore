import { FC, useState } from "react";
import productData from "data/productData";
import Image from "next/image";
import Link from "next/link";

const Products: FC = () => {
      return (
        <div className="flex flex-col items-center">
          {productData.map((product) => (
            <div
              key={product.id}
              className=" w-[340px] h-[256px] flex flex-col justify-center "
            >
              <div className="w-[340px] h-[200px] bg-[#FDFDFD] flex flex-col justify-center gap-[12px] p-[16px] border-[2px] border-solid border-[#010100] rounded-[8px]">
                <Link
                  href={`/write`}
                  className="flex flex-row gap-[12px] border-b-[2px] border-solid border-[#010100] pb-[12px] "
                >
                  <div className="w-[154px] h-[100px] overflow-hidden rounded-[8px] flex items-center">
                    <Image
                      src={product.img}
                      alt=""
                      width={308}
                      height={150}
                      className="rounded-[8px]"
                    />
                  </div>
                  <h1 className="font-bold text-[16px] text-[#010100]">
                    {product.title}
                  </h1>
                  {/* <p className="text-[12px] font-normal text-[#010100]">
                    {product.description}
                  </p> */}
                </Link>
                {/* <div className="flex justify-between mr-[40px] ml-[40px]">
                  <div className="flex gap-[8px] text-[#292824] items-center">
                    <i
                      className="ri-thumb-up-line"
                      style={{ fontSize: "24px" }}
                    ></i>
                    <span className="text-[12px]">{product.like}</span>
                  </div>
                  <div className="flex gap-[8px] text-[#292824] items-center">
                    <i
                      className="ri-thumb-down-line"
                      style={{ fontSize: "24px" }}
                    ></i>
                    <span className="text-[12px]">{product.dislike}</span>
                  </div>
                </div> */}
              </div>
            </div>
          ))}
        </div>
      );
};

export default Products;
