import { AppProps } from "next/app";
import Head from "next/head";
import { FC } from "react";
import { ContextProvider } from "../contexts/ContextProvider";
import Navbar from "../components/Navbar";
require("@solana/wallet-adapter-react-ui/styles.css");
require("../styles/globals.css");
import 'remixicon/fonts/remixicon.css'


const App: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Zkore</title>
      </Head>

      <ContextProvider>
        <div className="">
          <Navbar />
          <Component {...pageProps} />
        </div>
      </ContextProvider>
    </>
  );
};

export default App;
