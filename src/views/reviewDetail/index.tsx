// Next, React
import { FC, useEffect, useState } from "react";
import reviewData from "data/reviewData";
import Image from "next/image";
import { ReviewDetails } from "types/reviewTypes";

interface ReviewDetailProps {
  reviewId: number | undefined;
}

export const ReviewDetail: FC<ReviewDetailProps> = ({ reviewId }) => {
  const [review, setReview] = useState<ReviewDetails | undefined>();

  useEffect(() => {
    if (typeof reviewId === "number") {
      const foundReview = reviewData.find((Review) => Review.id === reviewId);
      setReview(foundReview);
    }
  }, [reviewId]);

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

  console.log(review);

  if (!review)
    return (
      <div className="flex justify-center mt-[50px]">
        No se encontró el Review
      </div>
    );

  return (
    <div className="">
      <div className="flex flex-col ml-[41px] mr-[41px] md:items-center mt-[40px]">
        <div className="flex items-center gap-[4px]">
          <i
            className="ri-arrow-left-s-line text-[#65676B]"
            style={{ fontSize: "18px" }}
          ></i>
          <span className="text-[12px] text-[#65676B]">
            remarmarea’s profile
          </span>
        </div>
        <div className="mt-[24px] flex flex-col gap-[12px]">
          <h1 className="text-[21px] font-semibold">{review.tittle}</h1>
          <span className="text-[#777E90] text-[14px] font-normal">
            {review.date}
          </span>
          <span className="flex gap-[4px] items-center">
            <i className="ri-award-fill" style={{ fontSize: "18px" }}></i>
            <p className="text-[12px]">Verified purchase</p>
          </span>
          <div className="flex gap-[12px]">{renderStars(review.rate)}</div>
        </div>
        <div className="flex flex-col items-center justify-center mt-[24px] gap-[24px]">
          <Image src={review.img} alt="" width={308} height={493.74} />
          <p className=" text-[12px] font-medium">{review.description}</p>
        </div>
        <div className="flex justify-evenly pt-[24px] mt-[24px] border-t-[1px] border-solid border-[#C9C8C8] mb-[36px]">
          <span className="flex gap-[8px] items-center">
            <i
              className="ri-thumb-up-line text-[#65676B]"
              style={{ fontSize: "24px" }}
            ></i>
            <p className="text-[12px] text-[#777E90]">{review.like}</p>
          </span>
          <span className="flex gap-[8px] items-center">
            <i
              className="ri-thumb-down-line text-[#65676B]"
              style={{ fontSize: "24px" }}
            ></i>
            <p className="text-[12px] text-[#777E90]">{review.dislike}</p>
          </span>
        </div>
        <div className="flex justify-center mb-[58px]">
          <a href={review.referral}>
            <button className="w-[308px] h-[48px] flex items-center justify-center gap-[12px] bg-[#047BE9] rounded-[8px] text-[#FFFFFF] text-[16px] font-medium">
              <i
                className="ri-link-m text-[#FFFFFF]"
                style={{ fontSize: "24px" }}
              ></i>
              Use referral
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};
