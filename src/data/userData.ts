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
        user: "2izS...nqMH",
        img: "/images/apple.png",
        title: "Macbook Air 13 M3",
        rate: 4.5,
        description: "MacBook Air M3: Impressively light, powerful for everyday tasks, and all-day battery life. Perfect for on-the-go professionals.",
        like: 1,
        dislike: 2,
        marker: false,
        reviewId: 1
      },
      {
        id: 2,
        user: "2izS...nqMH",
        img: "/images/pizza.png",
        title: "Macbook Air 13 M3",
        rate: 3,
        description: "MacBook Air M3: Impressively light, powerful for everyday tasks, and all-day battery life. Perfect for on-the-go professionals.",
        like: 1,
        dislike: 2,
        marker: true,
        reviewId: 3
      },
    ],
  },
  {
    id: "3izS...nqMH",
    img: "/images/persona1.png",
    user: "juvenalcampos",
    instagram: "https://www.instagram.com/ramondinopro/",
    numReviews: 20,
    numReferalls: 500,
    numLikes: 100,
    reviews: [
      {
        id: 1,
        user: "3izS...nqMH",
        img: "/images/sillon.png",
        title: "Macbook Air 13 M3",
        rate: 1.5,
        description: "MacBook Air M3: Impressively light, powerful for everyday tasks, and all-day battery life. Perfect for on-the-go professionals.",
        like: 1,
        dislike: 2,
        marker: false,
        reviewId: 2
      },
    ],
  },
  {
    id: "53jk...v3m1",
    img: "/images/knifeduck.png",
    user: "currUser",
    instagram: "https://www.instagram.com/ramondinopro/",
    numReviews: 1,
    numReferalls: 3,
    numLikes: 1,
    reviews: [
      {
        id: 1,
        user: "53jk...v3m1",
        img: "/images/pizza.png",
        title: "High End Pizza Shirt",
        rate: 4,
        description: "Pizza Shirt: Good material, easy to wash. Fits loosely for an oversized look.",
        like: 1,
        dislike: 2,
        marker: true,
        reviewId: 3
      },
    ],
  },
];

export default userData;
