/**
 * 도서 검색 결과를 표시하는 페이지 컴포넌트
 *
 * 주요 기능:
 * - 클라이언트 사이드 검색 처리
 * - URL 쿼리 파라미터를 통한 도서 검색
 * - 검색 결과 목록 표시
 * - 검색 가능한 레이아웃 적용
 * - 실시간 검색 결과 업데이트
 *
 * 변경사항:
 * - SSR에서 클라이언트 사이드 데이터 페칭으로 변경
 * - useRouter와 useEffect를 통한 실시간 검색 처리
 * - 상태 관리를 통한 검색 결과 업데이트
 */
import SearchableLayout from "@/components/searchable-layout";
import { ReactNode, useEffect, useState } from "react";
import BookItem from "@/components/book-item";
import fetchBooks from "@/lib/fetch-books";
import { useRouter } from "next/router";
import { BookData } from "@/types";

/**
 * 서버 사이드에서 실행되는 검색 데이터 페칭 함수
 * @param context - Next.js의 서버 사이드 컨텍스트
 * @returns 검색된 도서 목록을 포함한 props 객체
 */
// export const getStaticProps = async (
//   // Context에는 query 프로퍼티가 없다. 빌드 타임에는 알아낼 방법이 없다.
//   context: GetStaticPathsContext
// ) => {
//   // URL 쿼리 파라미터에서 검색어 추출
//   const q = context.query.q;

//   // 검색어를 사용하여 도서 목록 조회
//   const books = await fetchBooks(q as string);
//   return {
//     props: { books },
//   };
// };

/**
 * 검색 결과를 표시하는 페이지 컴포넌트
 * - 클라이언트 사이드에서 검색어를 감지하고 결과를 가져옴
 * - URL 쿼리 파라미터 변경에 따라 실시간으로 검색 결과 업데이트
 * - 변경사항: 서버 사이드 렌더링에서 클라이언트 사이드 데이터 페칭으로 전환
 */
export default function Page() {
  // 검색 결과를 저장하는 상태
  const [books, setBooks] = useState<BookData[]>([]);

  // Next.js 라우터를 사용하여 URL 쿼리 파라미터 접근
  const router = useRouter();
  const q = router.query.q;

  /**
   * 검색어를 사용하여 도서 목록을 가져오는 함수
   * - 클라이언트 사이드에서 API 호출
   * - 검색 결과를 상태에 저장
   * - 변경사항: 서버 사이드에서 클라이언트 사이드로 이동
   */
  const fetchSearchResult = async () => {
    const data = await fetchBooks(q as string);
    setBooks(data);
  };

  // 검색어가 변경될 때마다 검색 결과를 업데이트
  useEffect(() => {
    if (q) {
      // 검색어가 있는 경우에만 검색 실행
      fetchSearchResult();
    }
  }, [q]);

  return (
    <div>
      {/* 검색된 도서 목록을 BookItem 컴포넌트로 렌더링 */}
      {books.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

/**
 * 페이지에 검색 가능한 레이아웃을 적용하는 함수
 * @param page - 래핑할 페이지 컴포넌트
 * @returns SearchableLayout으로 감싸진 페이지
 */
Page.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};

/**
 * 코드 실행 흐름:
 * 1. 페이지 마운트 시 URL 쿼리 파라미터 확인
 * 2. 검색어가 있는 경우 클라이언트 사이드에서 API 호출
 * 3. 검색 결과를 상태에 저장
 * 4. 검색어 변경 시 자동으로 결과 업데이트
 * 5. 검색 결과를 UI에 렌더링
 *
 * 주요 기능:
 * - 클라이언트 사이드 검색 처리
 * - 실시간 검색 결과 업데이트
 * - URL 기반 검색 상태 관리
 * - 검색 UI 제공
 * - 동적 검색 결과 표시
 *
 * 변경사항 요약:
 * - 서버 사이드 렌더링에서 클라이언트 사이드 데이터 페칭으로 전환
 * - useRouter와 useEffect를 통한 실시간 검색 처리
 * - 상태 관리를 통한 검색 결과 업데이트
 */
