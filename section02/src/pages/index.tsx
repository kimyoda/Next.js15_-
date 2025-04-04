// 다른 css 코드와 충돌이 날 수 있기 때문에 app컴포넌트외에 다른 컴포넌트에는 적용을 못하도록 막았다.
// CSS Moudel 을 적용

import SearchableLayout from "@/components/searchable-layout";
import style from "./index.module.css";
import { ReactNode, useEffect } from "react";
// @는 tsconfig.json 안에 경로로 있다.
import books from "@/mock/books.json";
import BookItem from "@/components/book-item";
import { InferGetServerSidePropsType } from "next";

// 인덱스 경로로 접근하면 먼저 실행되는 함수
export const getServerSideProps = () => {
  // 컴포넌트보다 먼저 실행되어서, 해당 컴포넌트에 필요한 백엔드 데이터 등을 미리 불러오는 역할을 하는 함수다.

  console.log("서버사이드프롭스에요");
  // 서버측에서만 실행되는 함수이다.
  const data = "hello";
  // 객체를 반드시 반환해야 한다. 객체 타입의 props를 받는다.
  // Next 앱이 객체를 받아와서 페이지에 전달할 수 있다. 프레임워크의 문법이다.
  return {
    props: {
      data,
    },
  };
};

export default function Home({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  console.log(data);
  // 브라우저에 사용 가능한 방법
  useEffect(() => {
    console.log(window);
  }, []);

  return (
    <div className={style.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
        {/* books의 key값을 받고 전개연산자로 props전달 */}
        {books.map((book) => (
          <BookItem key={book.id} {...book} />
        ))}
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        {books.map((book) => (
          <BookItem key={book.id} {...book} />
        ))}
      </section>
    </div>
  );
}

// getLayout 호출하고 인수로 page를 받고 묶어서 리턴해준다.
// 자스의 모든 함수는 객체이다.
Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
