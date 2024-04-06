import type { NextPage } from "next";
import Head from "next/head";
import { CreateReview } from "views/createReview";

const WriteReview: NextPage = (props) => {
  return (
    <div>
      <Head>
        <title>Write</title>
        <meta name="description" content="Basic Functionality" />
      </Head>
      <CreateReview />
    </div>
  );
};

export default WriteReview;
