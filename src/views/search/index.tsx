// Next, React
import { FC, useEffect, useState } from "react";
import SearchBar from "components/SearchBar";
import activityData from "data/activityData";
import Image from "next/image";
import Link from "next/link";

export const Search: FC = ({}) => {
  const renderStars = (rate: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rate) {
        // Estrella llena
        stars.push(
          <i
            className="ri-star-fill text-[#047BE9]"
            style={{ fontSize: "18px" }}
            key={i}
          ></i>
        );
      } else if (i === Math.ceil(rate) && rate % 1 > 0) {
        // Estrella media si el rate tiene decimal y estamos en el siguiente entero más cercano
        stars.push(
          <i
            className="ri-star-half-line text-[#047BE9]"
            style={{ fontSize: "18px" }}
            key={i}
          ></i>
        );
      } else {
        // Estrella vacía
        stars.push(
          <i
            className="ri-star-line text-[#047BE9]"
            style={{ fontSize: "18px" }}
            key={i}
          ></i>
        );
      }
    }
    return stars;
  };
  return (
    <div className="">
      <SearchBar />
      <div className=" text-center mt-[32px] font-semibold text-[18px] not-italic text-[#010100] leading-relaxed">
        <h1>Recent Activity</h1>
      </div>
      <div className="flex flex-col justify-center items-center mt-[24px] gap-5">
        {activityData.map((activity) => (
          <div
            key={activity.id}
            className=" w-[340px] h-[406px] flex flex-col items-center gap-[12px] rounded-[8px] border border-solid border-[#C9C8C8] "
          >
            <div className="mt-[16px] flex justify-center gap-[12px] items-center">
              <span className="flex gap-1 text-[12px] items-center font-medium text-[#65676B]">
                <i className="ri-ghost-fill" style={{ fontSize: "18px" }}></i>
                {activity.user}
                <p>wrote review on</p>
              </span>
              <Link href={`/exploreUser/${activity.user}`}>
                <button className="w-[100px] h-[33px] border border-[#047BE9] rounded-[8px] text-[#047BE9] text-[12px] font-medium">
                  Explore user
                </button>
              </Link>
            </div>
            <div className="w-[308px] h-[329px] bg-[#E8E8E8] flex flex-col gap-[12px] p-[16px]">
              <Image src={activity.img} alt="" width={276} height={105} />
              <h1 className="font-semibold text-[16px] text-[#010100]">
                {activity.tittle}
              </h1>
              <div>{renderStars(activity.rate)}</div>
              <p className="text-[12px] font-normal text-[#010100]">
                {activity.description}
              </p>
              <div className="flex justify-between">
                <div className="flex gap-[8px] text-[#65676B] items-center">
                  <i
                    className="ri-thumb-up-line"
                    style={{ fontSize: "24px" }}
                  ></i>
                  <span className="text-[12px]">{activity.like}</span>
                </div>
                <div className="flex gap-[8px] text-[#65676B] items-center">
                  <i
                    className="ri-thumb-down-line"
                    style={{ fontSize: "24px" }}
                  ></i>
                  <span className="text-[12px]">{activity.dislike}</span>
                </div>
                <div className="flex gap-[8px] text-[#65676B] items-center">
                  <i className="ri-link-m" style={{ fontSize: "24px" }}></i>
                  <span className="text-[#777E90] text-[12px]">
                    Use referral
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div>
        <span className="relative justify-center flex gap-[4px] mt-[24px] text-[#777E90] items-center mb-[45px]">
          <p>Show more activity</p>
          <i className="ri-arrow-down-s-line " style={{ fontSize: "18px" }}></i>
        </span>
      </div>
    </div>
  );
};
