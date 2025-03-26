import { Html, Head, Main, NextScript } from "next/document";

// react index.html과 비슷한 기능을 담당함
export default function Document() {
  return (
    <Html lang="kr">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
