// Next, React
import { FC, useEffect, useState } from "react";
import userData from "data/userData";
import Image from "next/image";
import { User } from "types/userTypes";
import CardUserReview from "components/CardUserReview";
import Link from "next/link";

interface ExploreUserProps {
  userId: string | string[] | undefined;
}

export const ExploreUser: FC<ExploreUserProps> = ({ userId }) => {
  const [user, setUser] = useState<User | undefined>();

  useEffect(() => {
    if (typeof userId === "string") {
      const foundUser = userData.find((User) => User.id === userId);
      setUser(foundUser);
    }
  }, [userId]);

  console.log(user);

  if (!user)
    return (
      <div className="flex justify-center mt-[50px]">
        No se encontró el usuario
      </div>
    );

  return (
    <div className="">
      <div className="flex flex-col items-center gap-[12px] mt-[36px]">
        <Link href={"/search"}>
          <div className="flex items-center gap-[4px] mb-[20px]">
            <i
              className="ri-arrow-left-s-line text-[#292824] w-[24px] h-[24px] flex items-center"
              style={{ fontSize: "24px" }}
            ></i>
            <span className="text-[14px] font-normal text-[#292824]">Back</span>
          </div>
        </Link>
        <Image
          src={user.img}
          alt="profile"
          width={90}
          height={90}
          className=" rounded-[90px]"
          priority
        />
        <h1 className="text-[16px] font-bold text-[#010100]">{user.id}</h1>
        <h1 className="text-[14px] font-medium text-[#292824]">@{user.user}</h1>

        <p className="text-[#292824] text-[14px] font-normal">
          Check all my purchased products
        </p>
      </div>
      <div className="flex justify-center gap-[40px] pt-[24px] pb-[24px] mr-[41px] ml-[41px] text-[#292824] text-[14px]">
        <div className="flex flex-col gap-[6px] items-center">
          <span className="text-[16px]">{user.numReviews}</span>
          <h1>Reviews</h1>
        </div>
        <div className="flex flex-col gap-[6px] items-center">
          <span className="text-[16px]">{user.numReferalls}</span>
          <h1>Referrals</h1>
        </div>
        <div className="flex flex-col gap-[6px] items-center">
          <span className="text-[16px]">{user.numLikes}</span>
          <h1>Likes</h1>
        </div>
      </div>
      <div className="flex flex-col items-center pb-[24px] border-b-[2px] border-solid border-[#010100] ml-[25px] mr-[25px]">
        <button className="text-[14px] bg-[#FED302] font-medium text-[#010100] w-[102px] h-[48px] rounded-[8px] border-[2px] border-solid border-[#010100] shadow-custom">
          FOLLOW
        </button>
      </div>
      <div className="flex justify-evenly gap-[19px] pt-[24px] text-[16px] text-[#292824] font-medium">
        <span className="text-[#FA5D31] font-bold border-b-[3px] border-solid border-[#FA5D31] pb-[7px]">
          Reviews
        </span>
        <span>Favorites</span>
        <span>Wishlist</span>
      </div>
      <div className="flex flex-col items-center gap-[12px] mt-[24px] mb-[49px]">
        <CardUserReview userR={user.reviews} />
      </div>
    </div>
  );
};
