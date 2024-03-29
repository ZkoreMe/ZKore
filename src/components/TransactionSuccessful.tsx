import { FC, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PayProduct } from "types/payTypes";
import payData from "data/payData";
import reviewData from "data/reviewData";
import { ReviewDetails } from "types/reviewTypes";

interface PaySol {
  paysolId: number | undefined;
}

const TransactionSuccessful: FC<PaySol> = ({ paysolId }) => {
  const [review, setReview] = useState<ReviewDetails | undefined>();

  useEffect(() => {
    if (typeof paysolId === "number") {
      // Buscar en payData para encontrar el objeto correspondiente usando payId
      const foundPayProduct = payData.find(
        (payProduct: PayProduct) => payProduct.id === paysolId
      );
      if (foundPayProduct) {
        // Usar reviewId de foundPayProduct para buscar en reviewData
        const foundReview = reviewData.find(
          (review: ReviewDetails) => review.id === foundPayProduct.reviewId
        );
        setReview(foundReview);
      }
    }
  }, [paysolId]);

  console.log(review);

  if (!review) {
    return (
      <div className="flex justify-center mt-[50px]">
        No se encontró el Review
      </div>
    );
  }

  return (
    <div className="">
      <div className="w-[340px] h-[760px] border-[2px] border-solid border-[#010100] bg-[#FDFDFD] rounded-[8px] flex flex-col items-center p-[20px] gap-[20px]">
        <div>
          <Image
            src={"/images/successful.svg"}
            alt="Successful"
            width={80}
            height={80}
          />
        </div>
        <div className="flex flex-col gap-[16px] items-center">
          <span className="text-[#000000] text-[21px] font-medium">
            Transaction Successful
          </span>
          <span className="text-[#292824] text-[14px] font-medium">
            You’ve successfully bought your product.
          </span>
        </div>
        <div className="border-[2px] border-solid border-[#010100] w-[300px]"></div>
        <span className="text-[#000000] text-[18px] font-medium">
          Share your experience
        </span>
        <div className="flex justify-center gap-[40px]">
          <i
            className="ri-facebook-circle-line text-[#010100]"
            style={{ fontSize: "24px" }}
          ></i>
          <i
            className="ri-twitter-line text-[#010100]"
            style={{ fontSize: "24px" }}
          ></i>
          <i
            className="ri-instagram-line text-[#010100]"
            style={{ fontSize: "24px" }}
          ></i>
        </div>
        <div className="flex justify-center items-center gap-[20px]">
          <div>
            <div>
              <Image
                src={review.img2[0]}
                alt="Successful"
                width={90}
                height={82}
              />
            </div>
          </div>
          <div className="flex flex-col gap-[8px] justify-center">
            <span className="text-[#292824] text-[12px] font-medium text-right">
              {review.tittle}
            </span>
            <span className="text-[#292824] text-[12px] font-bold text-right">
              TOTAL ${review.price} USDC
            </span>
          </div>
        </div>
        <div className=" flex justify-center items-center gap-[12px] w-[300px] rounded-[8px] shadow-custom border-[2px] border-solid border-[#000] h-[48px] bg-[#93A6EC]">
          <i
            className="ri-coupon-3-line text-[#010100]"
            style={{ fontSize: "24px" }}
          ></i>
          <button className="text-[16px] font-medium text-[#010100]">
            REDEEM ON SITE
          </button>
        </div>
        <div className="border-[2px] border-solid border-[#010100] w-[300px]"></div>
        <div className=" flex justify-center items-center gap-[12px] w-[300px] rounded-[8px]  border-[2px] border-dashed border-[#000] h-[46px] bg-transparent">
          <button className="text-[16px] font-medium text-[#010100]">
            REVIEW & WIN REWARDS
          </button>
        </div>
        <div className="text-[#292824] text-[12px] font-medium flex flex-col gap-[15px] text-center">
          <span>Your voice shapes the future! 🚀</span>
          <span>
            Your reviews not only guide others to make informed choices but also
            reward you.
          </span>
          <span>
            Share your experience, impact the community, and enjoy exclusive
            rewards on your next discovery.
          </span>
        </div>
      </div>
    </div>
  );
};

export default TransactionSuccessful;
