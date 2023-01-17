import type { AppProps } from "next/app";
import GlobalStyle from "../../GlobalStyle.js";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  );
}
