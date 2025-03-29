// 다른 css 코드와 충돌이 날 수 있기 때문에 app컴포넌트외에 다른 컴포넌트에는 적용을 못하도록 막았다.
// CSS Moudel 을 적용

import SearchableLayout from "@/components/searchable-layout";
import style from "./index.module.css";
import { ReactNode } from "react";

export default function Home() {
  // 인라인 스타일 지정 가능
  return (
    <>
      <h1 className={style.h1}>인덱스</h1>
      <h2 className={style.h2}>H2</h2>
    </>
  );
}

// getLayout 호출하고 인수로 page를 받고 묶어서 리턴해준다.
// 자스의 모든 함수는 객체이다.
Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
