/**
 * 도서 검색 결과를 표시하는 페이지 컴포넌트
 *
 * 주요 기능:
 * - URL 쿼리 파라미터를 통한 도서 검색
 * - 검색 결과 목록 표시
 * - 검색 가능한 레이아웃 적용
 */
import SearchableLayout from "@/components/searchable-layout";
import { ReactNode } from "react";
import BookItem from "@/components/book-item";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import fetchBooks from "@/lib/fetch-books";

/**
 * 서버 사이드에서 실행되는 검색 데이터 페칭 함수
 * @param context - Next.js의 서버 사이드 컨텍스트
 * @returns 검색된 도서 목록을 포함한 props 객체
 */
export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  // URL 쿼리 파라미터에서 검색어 추출
  const q = context.query.q;

  // 검색어를 사용하여 도서 목록 조회
  const books = await fetchBooks(q as string);
  return {
    props: { books },
  };
};

/**
 * 검색 결과를 표시하는 페이지 컴포넌트
 * @param books - 서버에서 검색된 도서 목록
 */
export default function Page({
  books,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  // useRouter로 query 쿼리스트링을 사용할 수 있다.
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
 * 1. URL 쿼리 파라미터에서 검색어 추출 (서버 사이드)
 * 2. 검색어로 도서 목록 조회 (서버 사이드)
 * 3. 검색 결과를 props로 페이지 컴포넌트에 전달
 * 4. 클라이언트에서 검색 결과 렌더링
 *
 * 주요 기능:
 * - 서버 사이드 검색 처리
 * - 검색 결과 표시
 * - 검색 UI 제공
 * - 동적 검색 결과 업데이트
 */
