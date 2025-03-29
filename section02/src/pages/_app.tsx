import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  // 프로그매틱한 페이지 이동 방법
  const onClickButton = () => {
    // 아래와 같은 메서드들도 있음.
    // replace 뒤로 가기를 방지하며 페이지 이동
    // back 페이즈를 뒤로 이동
    router.push("/test");
  };
  // prefetching 방법 link가 아닌 prefetch를 통해 명시적으로 프리페칭을 설정할 수 있다.
  useEffect(() => {
    router.prefetch("/test");
  }, []);

  return (
    <>
      <header>
        {/* 1. 링크로 이동시키는 방법 */}
        <Link href={"/"}>index</Link>
        &nbsp;
        {/* 프리페칭을 강제로 해제하는 방법 , prefetch를 false로 설정*/}
        <Link href={"/search"} prefetch={false}>
          search
        </Link>
        &nbsp;
        <Link href={"/book/1"}>book/1</Link>
        <div>
          <button onClick={onClickButton}>/test 페이지로 이동</button>
        </div>
      </header>
      <Component {...pageProps} />
    </>
  );
}
