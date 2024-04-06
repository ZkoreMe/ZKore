import type { NextPage } from "next";
import Head from "next/head";
import { HomeView } from "../views";

const Home: NextPage = (props) => {
  return (
    <div>
      <Head>
        <title>ZKore</title>
        <meta
          name="description"
          content="Zkore Marketplace"
        />
      </Head>
      <HomeView />
    </div>
  );
};

export default Home;
