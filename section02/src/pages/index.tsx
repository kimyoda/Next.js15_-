// 다른 css 코드와 충돌이 날 수 있기 때문에 app컴포넌트외에 다른 컴포넌트에는 적용을 못하도록 막았다.
// CSS Moudel 을 적용

import SearchableLayout from "@/components/searchable-layout";
import style from "./index.module.css";
import { ReactNode } from "react";
// @는 tsconfig.json 안에 경로로 있다.
import books from "@/mock/books.json";
import BookItem from "@/components/book-item";

export default function Home() {
  // 인라인 스타일 지정 가능
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
