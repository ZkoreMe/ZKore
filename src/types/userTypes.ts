
interface Review {
  id: number;
  tittle: string;
  num: number;
  img: string;
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
