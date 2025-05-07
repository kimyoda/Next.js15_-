import BookItem from "@/components/book-item";
import { BookData } from "@/types";

// 동적인 기능이 작동이 되지않아, 부작용이 생길 수 있다.
// export const dynamic = "error";

// 검색 페이지 컴포넌트
export default async function Page({
  searchParams, // URL의 쿼리 파라미터를 받는 객체
}: {
  searchParams: Promise<{ q?: string }>; // q는 검색어를 나타내는 선택적 파라미터
}) {
  // 검색어를 추출
  const { q } = await searchParams;

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
