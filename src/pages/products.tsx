import type { NextPage } from "next";
import Head from "next/head";
import { SearchProducts } from "views/searchProducts";

const Products: NextPage = (props) => {
  return (
    <div>
      <Head>
        <title>Search</title>
        <meta name="description" content="Basic Functionality" />
      </Head>
      <SearchProducts />
    </div>
  );
};

export default Products;
