import { Analytics } from "@vercel/analytics/react";
import { AppProps } from "next/app";
import "@styles/globals.css";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Component {...pageProps} />
      <Analytics />
    </>
  );
}

export default MyApp;
