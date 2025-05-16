// Next.js 13 이상에서 사용되는 새로운 App Router 구조의 페이지 컴포넌트
// (with-searchbar) 그룹은 레이아웃을 공유하는 페이지들을 그룹화한 것이다.

import BookItem from "@/components/book-item";
import style from "./page.module.css";
import { BookData } from "@/types";
import { delay } from "@/util/delay";
import { Suspense } from "react";
import BookListSkeleton from "@/components/skeleton/book-list-skeleton";

// export const dynamic = "force-dynamic";
// 특정 페이지의 유형을 강제로 Static, Dynamic 페이지로 설정한다.
// 1. auto : 기본값으로 아무것도 강제하지 않는 옵션이다.(생략해도 상관이 없다)
// 2. force-dynamic : 페이지를 강제로 Dynamic 페이지로 설정하는 옵션이다.
// 3. force-static : 페이지를 강제로 Static 페이지로 설정하는 옵션이다.
// 4. error : 페이지를 강제로 Static 페이지로 설정한다 (동적함수나 캐싱되지 않는 함수가 있다면 빌드 오류를 발생시킨다)

// 모든 도서를 가져오는 컴포넌트
async function AllBooks() {
  await delay(1500); // 개발 환경에서 로딩 상태를 확인하기 위한 인위적 지연
  // API 서버에서 모든 도서 데이터를 가져옴
  // 캐싱 비활성화: { cache: "no-store" } 옵션으로 매 요청 시 최신 데이터를 가져옵니다.
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`,
    { cache: "no-cache" }
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
  await delay(3000); // 개발 환경에서 로딩 상태를 확인하기 위한 인위적 지연
  // API 서버에서 랜덤 추천 도서 데이터를 가져옴
  // ISR 설정: next.revalidate를 3초로 지정해, 최초 빌드 후 3초마다 재검증합니다.
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/random`,
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

// 다이나믹 페이지 적용
export const dynamic = "force-dynamic";

// 메인 홈페이지 컴포넌트
export default function Home() {
  return (
    <div className={style.container}>
      {/* 추천 도서 섹션 */}
      <section>
        <h3>지금 추천하는 도서</h3>
        {/* Suspense를 사용하여 비동기 데이터 로딩 중에 스켈레톤 UI를 표시 */}
        <Suspense fallback={<BookListSkeleton count={3} />}>
          <RecoBooks />
        </Suspense>
      </section>
      {/* 전체 도서 목록 섹션 */}
      <section>
        <h3>등록된 모든 도서</h3>
        {/* Suspense를 사용하여 비동기 데이터 로딩 중에 스켈레톤 UI를 표시 */}
        <Suspense fallback={<BookListSkeleton count={10} />}>
          <AllBooks />
        </Suspense>
      </section>
    </div>
  );
}
