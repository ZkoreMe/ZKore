interface Review {
  id: number;
  user: string;
  img: string;
  tittle: string;
  rate: number;
  description: string;
  like: number;
  dislike: number;
  marker: boolean;
  reviewId: number;
}

export interface User {
  id: string;
  img: string;
  user: string;
  instagram: string;
  numReviews: number;
  numReferalls: number;
  numLikes: number;
  reviews: Review[];
}
