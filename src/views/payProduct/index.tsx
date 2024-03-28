// Next, React
import { FC, useEffect, useState } from "react";
import reviewData from "data/reviewData";
import payData from "data/payData";
import Image from "next/image";
import { ReviewDetails } from "types/reviewTypes";
import { PayProduct } from "types/payTypes";
import Link from "next/link";
import BuyOption from "components/BuyOption";

interface ReviewDetailProps {
  payId: number | undefined;
}

export const PayProductStep: FC<ReviewDetailProps> = ({ payId }) => {
  const [review, setReview] = useState<ReviewDetails | undefined>();

  useEffect(() => {
    if (typeof payId === "number") {
      // Buscar en payData para encontrar el objeto correspondiente usando payId
      const foundPayProduct = payData.find(
        (payProduct: PayProduct) => payProduct.id === payId
      );
      if (foundPayProduct) {
        // Usar reviewId de foundPayProduct para buscar en reviewData
        const foundReview = reviewData.find(
          (review: ReviewDetails) => review.id === foundPayProduct.reviewId
        );
        setReview(foundReview);
      }
    }
  }, [payId]);

  console.log(review);

  if (!review) {
    return (
      <div className="flex justify-center mt-[50px]">
        No se encontró el Review
      </div>
    );
  }

  return (
    <div className="mt-[36px] ml-[25px] mr-[25px] flex flex-col gap-[20px] justify-center items-center">
      <Link href={`/reviewDetail/${review.id}`}>
        <div className="flex items-center gap-[4px]">
          <i
            className="ri-arrow-left-s-line text-[#292824] w-[24px] h-[24px] flex items-center"
            style={{ fontSize: "24px" }}
          ></i>
          <span className="text-[14px] font-normal text-[#292824]">Back</span>
        </div>
      </Link>
      <div className="flex flex-col gap-[4px]">
        <h1 className="text-[#010100] text-[21px] font-medium">
          {" "}
          {review.tittle}
        </h1>
        <p className="text-[#292824] font-normal text-[12px]">{review.url}</p>
      </div>
      <div className="w-[340px] h-[340px] overflow-hidden rounded-[8px] flex items-center border-[2px] border-solid border-[#000] ">
        <Image
          src={review.img2[0]}
          alt=""
          width={340}
          height={340}
          className="rounded-[8px]"
          objectFit=""
        />
      </div>
      <div className="mb-[40.5px] flex flex-col gap-[20px]">
        <h1 className=" text-[#010100] text-[18px] font-bold">Buying Options</h1>
        <BuyOption payR={review} />
      </div>
    </div>
  );
};
