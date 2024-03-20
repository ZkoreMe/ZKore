// Next, React
import { FC, useEffect, useState } from "react";
import userData from "data/userData";
import Image from "next/image";
import { User } from "types/userTypes";

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

  if (!user) return <div className="flex justify-center mt-[50px]">No se encontró el usuario</div>;

  return (
    <div className="">
      <div className="flex flex-col items-center gap-[12px] mt-[40px]">
        <Image
          src={user.img}
          alt="profile"
          width={90}
          height={90}
          className=" rounded-[90px]"
          priority
        />
        <h1 className="text-[18px] font-semibold text-[#010100]">
          {user.user}
        </h1>
        <a href={user.instagram}>
          <i
            className="ri-instagram-line text-[#65676B]"
            style={{ fontSize: "24px" }}
          ></i>
        </a>
        <p className="text-[#777E90] text-[14px] font-normal">
          Check all my purchased products
        </p>
      </div>
      <div className="flex flex-col items-center mt-[24px]">
        <button className="text-[14px] font-medium text-[#047BE9] w-[95px] h-[36px] rounded-[8px] border border-solid border-[#047BE9]">
          Follow
        </button>
      </div>
      <div className="flex justify-center gap-[40px] pt-[24px] pb-[24px] mt-[24px] border-t-[1px] border-b-[1px] border-solid border-[#C9C8C8] mr-[41px] ml-[41px]">
        <div className="flex flex-col gap-[6px] items-center text-[#777E90]">
          <span>{user.numReviews}</span>
          <h1>Reviews</h1>
        </div>
        <div className="flex flex-col gap-[6px] items-center text-[#777E90]">
          <span>{user.numReferalls}</span>
          <h1>Referrals</h1>
        </div>
        <div className="flex flex-col gap-[6px] items-center text-[#777E90]">
          <span>{user.numLikes}</span>
          <h1>Likes</h1>
        </div>
      </div>
      <div className="flex justify-center gap-[19px] pt-[24px] text-[16px] text-[#65676B] font-medium">
        <span className="text-[#047BE9] font-semibold border-b-[3px] border-solid border-[#047BE9] pb-[7px]">
          Reviews
        </span>
        <span>Favorites</span>
        <span>Wishlist</span>
      </div>
      <div className="flex flex-col items-center gap-[12px] mt-[24px] mb-[49px]">
        {user.reviews.map((review) => (
          <div key={review.id} className="w-[340px] h-[253px] flex flex-col items-center">
            <div className=" border-b-[1px] w-full flex justify-center border-solid border-[#C9C8C8] pb-[12px]">
              <Image src={review.img} alt="product" width={180} height={180} />
            </div>
            <div className="flex flex-col w-full mt-[12px] gap-[4px]">
              <h1 className="text-[18px] font-semibold">
                {review.tittle}
              </h1>
              <span className="text-[14px] font-normal text-[#777E90]">
                {review.num} reviews
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
