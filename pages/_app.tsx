import { Analytics } from '@vercel/analytics/react'
import { AppProps } from "next/app";
import "@styles/global.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <Analytics />
    </>
  );
}
