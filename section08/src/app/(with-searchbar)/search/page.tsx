// 검색 결과를 표시하는 페이지 컴포넌트
// Next.js 13의 새로운 App Router 구조를 사용하며, 동적 라우팅을 지원합니다.

import BookItem from "@/components/book-item";
import BookListSkeleton from "@/components/skeleton/book-list-skeleton";
import { BookData } from "@/types";
import { delay } from "@/util/delay";
import { Suspense } from "react";

// 검색 결과를 표시하는 비동기 컴포넌트
async function SearchResult({ q }: { q: string }) {
  // 개발 환경에서 로딩 상태를 확인하기 위한 인위적 지연
  await delay(1500);

  // API 서버에 검색 요청을 보내고 결과를 가져옴
  // 기본 캐싱: 옵션 미지정 시 정적 생성 캐시 사용
  // 한번 검색이 된 데이터는 조금 더 빠르게 데이터 검색이 가능
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/search?q=${q}`,
    { cache: "force-cache" }
  );
  if (!response.ok) {
    return <div>오류가 발생했습니다!</div>;
  }

  // 검색 결과를 BookData 타입의 배열로 변환
  const books: BookData[] = await response.json();

  // 검색 결과를 BookItem 컴포넌트로 렌더링
  return (
    <div>
      {books.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

// 동적인 기능이 작동이 되지않아, 부작용이 생길 수 있다.
// export const dynamic = "error";

// 검색 페이지 컴포넌트
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;

  return (
    // Suspense를 사용하여 비동기 데이터 로딩 중에 스켈레톤 UI를 표시
    // key값이 바뀌면 새롭게 그리는 활용하여 로딩상태를 표시하게 할 수 있다.
    <Suspense key={q || ""} fallback={<BookListSkeleton count={3} />}>
      {/* Suspense를 통해 스트리밍 적용 */}
      <SearchResult q={q || ""} />
    </Suspense>
  );
}
