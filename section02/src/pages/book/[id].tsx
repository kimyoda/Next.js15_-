/**
 * 개별 도서의 상세 정보를 표시하는 페이지 컴포넌트
 *
 * 주요 기능:
 * - 동적 라우팅을 통한 개별 도서 페이지 구현
 * - 서버 사이드 렌더링을 통한 SEO 최적화
 * - 도서 상세 정보 표시
 */
import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import style from "./[id].module.css";
import fecthOneBook from "@/lib/fetch-one-books";
// ...을 붙이면 catch all segment 모든 구간에 대응하는 페이지는 ...을 붙인다.
// 범용적으로 하고싶다면 []로 한번 더 감싼다. -> optional catch allsegment라고 한다.

/**
 * 서버 사이드에서 실행되는 데이터 페칭 함수
 * @param context - Next.js의 서버 사이드 컨텍스트
 * @returns 페이지에 필요한 props 객체
 */

export const getStaticPaths = () => {
  return {
    paths: [
      { params: { id: "1" } },
      { params: { id: "2" } },
      { params: { id: "3" } },
    ],
    fallback: false,
  };
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  // URL 파라미터에서 도서 ID 추출
  const id = context.params!.id;
  // 해당 ID의 도서 정보 조회
  const book = await fecthOneBook(Number(id));

  console.log(id);
  return {
    props: { book },
  };
};

/**
 * 도서 상세 정보를 표시하는 페이지 컴포넌트
 * @param book - 서버에서 조회한 도서 정보
 */

export default function Page({
  book,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  // 도서 정보가 없는 경우 에러 메시지 표시
  if (!book) {
    return "문제가 발생했습니다 다시 시도하세요";
  }

  // 도서 정보 구조 분해 할당
  const { title, subTitle, author, coverImgUrl, description, publisher } = book;
  return (
    <div className={style.container}>
      {/* 도서 표지 이미지 섹션 */}
      <div
        className={style.cover_img_container}
        style={{ backgroundImage: `url('${coverImgUrl}')` }}
      >
        <img src={coverImgUrl} />
      </div>
      {/* 도서 정보 섹션 */}
      <div className={style.title}>{title}</div>
      <div className={style.subTitle}>{subTitle}</div>
      <div className={style.author}>
        {author} | {publisher}
      </div>
      <div className={style.description}>{description}</div>
    </div>
  );
}

/**
 * 코드 실행 흐름:
 * 1. URL 파라미터에서 도서 ID 추출 (서버 사이드)
 * 2. ID를 사용하여 도서 정보 조회 (서버 사이드)
 * 3. 조회된 정보를 props로 페이지 컴포넌트에 전달
 * 4. 클라이언트에서 도서 정보 렌더링
 *
 * 주요 기능:
 * - 동적 라우팅 처리
 * - 서버 사이드 데이터 페칭
 * - 도서 상세 정보 표시
 * - 에러 상황 처리
 */
