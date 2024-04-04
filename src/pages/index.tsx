import type { NextPage } from "next";
import Head from "next/head";
import { HomeView } from "../views";
import { Search } from "views/search";

const Home: NextPage = (props) => {
  return (
    <div>
      <Head>
        <title>ZKore</title>
        <meta
          name="description"
          content="Solana Scaffold"
        />
      </Head>
      <Search />
    </div>
  );
};

export default Home;
