import type { NextPage } from "next";
import Head from "next/head";
import { Search } from "views/search";

const Searchs: NextPage = (props) => {
  return (
    <div>
      <Head>
        <title>Search</title>
        <meta name="description" content="Basic Functionality" />
      </Head>
      <Search />
    </div>
  );
};

export default Searchs;
