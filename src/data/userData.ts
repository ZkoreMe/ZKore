import { User } from "types/userTypes";

const userData: User[] = [
  {
    id: "2izS...nqMH",
    img: "/images/useri.png",
    user: "remarmarea",
    instagram: "https://www.instagram.com/ramondinopro/",
    numReviews: 96,
    numReferalls: 247,
    numLikes: 1542,
    reviews: [
      {
        id: 1,
        tittle: "PC",
        num: 2,
        img: "/images/PC.png",
      },
      {
        id: 2,
        tittle: "Phone",
        num: 5,
        img: "/images/Phone.png",
      },
      {
        id: 3,
        tittle: "Earphones",
        num: 5,
        img: "/images/Earphones.png",
      },
      {
        id: 4,
        tittle: "Books",
        num: 5,
        img: "/images/Books.png",
      },
    ],
  },
];

export default userData;
