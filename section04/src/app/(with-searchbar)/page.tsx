import BookItem from "@/components/book-item";
import style from "./page.module.css";
import { BookData } from "@/types";

// 모든 도서를 가져오는 컴포넌트
async function AllBooks() {
  // API 서버에서 모든 도서 데이터를 가져옴
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`,
    { cache: "no-store" }
  );
  if (!response.ok) {
    return <div>오류가 발생했습니다 ...</div>;
  }
  const allBooks: BookData[] = await response.json();

  return (
    <div>
      {allBooks.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

// 추천 도서를 가져오는 컴포넌트
async function RecoBooks() {
  // API 서버에서 랜덤 추천 도서 데이터를 가져옴
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/random`,
    // { cache: "force-cache" }
    { next: { revalidate: 3 } }
  );
  if (!response.ok) {
    return <div>오류가 발생했습니다!</div>;
  }

  const recoBooks: BookData[] = await response.json();

  return (
    <div>
      {recoBooks.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

// 메인 홈페이지 컴포넌트
export default function Home() {
  return (
    <div className={style.container}>
      {/* 추천 도서 섹션 */}
      <section>
        <h3>지금 추천하는 도서</h3>
        <RecoBooks />
      </section>
      {/* 전체 도서 목록 섹션 */}
      <section>
        <h3>등록된 모든 도서</h3>
        <AllBooks />
      </section>
    </div>
  );
}
