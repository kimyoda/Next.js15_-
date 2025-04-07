// 다른 css 코드와 충돌이 날 수 있기 때문에 app컴포넌트외에 다른 컴포넌트에는 적용을 못하도록 막았다.
// CSS Moudel 을 적용

/**
 * 도서 목록 메인 페이지 컴포넌트
 *
 * 주요 기능:
 * - 전체 도서 목록 표시
 * - 추천 도서 목록 표시
 * - 검색 가능한 레이아웃 적용
 * - CSS 모듈을 통한 스타일 관리
 * - SSG(Static Site Generation)를 통한 성능 최적화
 */
import SearchableLayout from "@/components/searchable-layout";
import style from "./index.module.css";
import { ReactNode } from "react";
// @는 tsconfig.json 안에 경로로 있다.
import BookItem from "@/components/book-item";
import { InferGetStaticPropsType } from "next";
import fetchBooks from "@/lib/fetch-books";
import fetchRandomBooks from "@/lib/fetch-random-books";
import Head from "next/head";

/**
 * SSG(Static Site Generation)를 위한 데이터 페칭 함수
 * - 빌드 시점에 데이터를 미리 가져와 정적 페이지 생성
 * - SSR 대비 더 나은 성능과 SEO 최적화 제공
 * @returns 전체 도서 목록과 추천 도서 목록을 포함한 props 객체
 */
export const getStaticProps = async () => {
  // 전체 도서 목록과 추천 도서 목록을 병렬로 조회
  const [allBooks, recoBooks] = await Promise.all([
    fetchBooks(),
    fetchRandomBooks(),
  ]);

  return {
    props: {
      allBooks,
      recoBooks,
    },
  };
};

/**
 * 메인 페이지 컴포넌트
 * @param allBooks - 빌드 시점에 가져온 전체 도서 목록
 * @param recoBooks - 빌드 시점에 가져온 추천 도서 목록
 */
export default function Home({
  allBooks,
  recoBooks,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      {/* Head라는 추가적인 컴포넌트를 이용해 타이틀이나 메타태그를 별도로 설정이 가능하다. */}
      <Head>
        <title>한입북스</title>
        <meta property="og:image" content="/thumbnail.png" />
        <meta property="og:title" content="한입북스" />
        <meta
          property="og:description"
          content="한입 북스에 등록된 도서들을 만나보세요"
        />
      </Head>
      <div className={style.container}>
        {/* 추천 도서 섹션 */}
        <section>
          <h3>지금 추천하는 도서</h3>
          {/* books의 key값을 받고 전개연산자로 props전달 */}
          {recoBooks.map((book) => (
            <BookItem key={book.id} {...book} />
          ))}
        </section>
        {/* 전체 도서 목록 섹션 */}
        <section>
          <h3>등록된 모든 도서</h3>
          {allBooks.map((book) => (
            <BookItem key={book.id} {...book} />
          ))}
        </section>
      </div>
    </>
  );
}

/**
 * 페이지에 검색 가능한 레이아웃을 적용하는 함수
 * @param page - 래핑할 페이지 컴포넌트
 * @returns SearchableLayout으로 감싸진 페이지
 */
Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};

/**
 * 코드 실행 흐름:
 * 1. 빌드 시점에 도서 데이터 병렬 조회 (SSG)
 * 2. 조회된 데이터를 정적 페이지로 생성
 * 3. 클라이언트 요청 시 미리 생성된 페이지 제공
 * 4. SearchableLayout을 통해 검색 기능 제공
 *
 * 주요 기능:
 * - SSG를 통한 성능 최적화
 * - 정적 페이지 생성으로 빠른 로딩
 * - 병렬 데이터 로딩
 * - 도서 목록 표시
 * - 추천 도서 표시
 * - 검색 UI 제공
 */
