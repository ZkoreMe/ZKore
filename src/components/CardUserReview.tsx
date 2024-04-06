import { FC } from "react";
import Image from "next/image";
import Link from "next/link";

interface UserReview {
  id: number;
  user: string;
  img: string;
  title: string;
  rate: number;
  description: string;
  like: number;
  dislike: number;
  marker: boolean;
  reviewId: number;
}

interface CardUserReviewProps {
  userR: UserReview[];
}

const CardUserReview: FC<CardUserReviewProps> = ({ userR }) => {
  const renderStars = (rate: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rate) {
        // Estrella llena
        stars.push(
          <i
            className="ri-star-fill text-[#FA5D31]"
            style={{ fontSize: "18px" }}
            key={i}
          ></i>
        );
      } else if (i === Math.ceil(rate) && rate % 1 > 0) {
        // Estrella media si el rate tiene decimal y estamos en el siguiente entero más cercano
        stars.push(
          <i
            className="ri-star-half-line text-[#FA5D31]"
            style={{ fontSize: "18px" }}
            key={i}
          ></i>
        );
      } else {
        // Estrella vacía
        stars.push(
          <i
            className="ri-star-line text-[#FA5D31]"
            style={{ fontSize: "18px" }}
            key={i}
          ></i>
        );
      }
    }
    return stars;
  };
  return (
    <div className="flex flex-col items-center gap-5">
      {userR.map((user) => (
        <div
          key={user.id}
          className=" w-[340px] h-[406px] flex flex-col justify-center gap-[18px]"
        >
          <div className="w-[340px] h-[374px] bg-[#FDFDFD] flex flex-col justify-center gap-[12px] p-[16px] border-[2px] border-solid border-[#010100] rounded-[8px]">
            <Link
              href={`/reviewDetail/${user.reviewId}`}
              className="flex flex-col gap-[12px] border-b-[2px] border-solid border-[#010100] pb-[12px] "
            >
              <div className="w-[308px] h-[150px] overflow-hidden rounded-[8px] flex items-center">
                <Image
                  src={user.img}
                  alt=""
                  width={308}
                  height={150}
                  className="rounded-[8px]"
                  objectFit="cover"
                />
              </div>
              <h1 className="font-bold text-[16px] text-[#010100]">
                {user.title}
              </h1>
              <div className="flex gap-[12px]">{renderStars(user.rate)}</div>
              <p className="text-[12px] font-normal text-[#010100]">
                {user.description}
              </p>
            </Link>
            <div className="flex justify-between mr-[40px] ml-[40px]">
              <div className="flex gap-[8px] text-[#292824] items-center">
                <i
                  className="ri-thumb-up-line"
                  style={{ fontSize: "24px" }}
                ></i>
                <span className="text-[12px]">{user.like}</span>
              </div>
              <div className="flex gap-[8px] text-[#292824] items-center">
                <i
                  className="ri-thumb-down-line"
                  style={{ fontSize: "24px" }}
                ></i>
                <span className="text-[12px]">{user.dislike}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardUserReview;
