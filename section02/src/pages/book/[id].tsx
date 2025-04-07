/**
 * 개별 도서의 상세 정보를 표시하는 페이지 컴포넌트
 *
 * 주요 기능:
 * - 동적 라우팅을 통한 개별 도서 페이지 구현
 * - SSG(Static Site Generation)를 통한 성능 최적화
 * - 도서 상세 정보 표시
 * - 빌드 시점에 정적 페이지 생성
 * - 폴백(fallback) 상태 처리
 *
 * 변경사항:
 * - SSR에서 SSG로 변경하여 성능 최적화
 * - getStaticPaths 추가로 모든 가능한 경로 미리 생성
 * - 빌드 시점에 데이터 페칭 및 페이지 생성
 * - 폴백 상태 처리 로직 추가
 */
import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import style from "./[id].module.css";
import fecthOneBook from "@/lib/fetch-one-books";
import { useRouter } from "next/router";
import Head from "next/head";
// ...을 붙이면 catch all segment 모든 구간에 대응하는 페이지는 ...을 붙인다.
// 범용적으로 하고싶다면 []로 한번 더 감싼다. -> optional catch allsegment라고 한다.

/**
 * SSG(Static Site Generation)를 위한 데이터 페칭 함수
 * - 빌드 시점에 모든 가능한 경로에 대한 페이지를 미리 생성
 * - SSR 대비 더 나은 성능과 SEO 최적화 제공
 * - 변경사항: getServerSideProps에서 getStaticProps로 변경
 *
 * @param context - Next.js의 정적 생성 컨텍스트
 * @returns 페이지에 필요한 props 객체
 */

/**
 * 동적 라우팅을 위한 경로 생성 함수
 * - 빌드 시점에 생성할 페이지 경로 목록 반환
 * - 모든 가능한 도서 ID에 대한 페이지를 미리 생성
 * - 폴백 옵션 설정으로 미리 생성되지 않은 경로 처리
 *
 * fallback 옵션 설명:
 * - false: 미리 생성되지 않은 경로는 404 페이지로 리다이렉트
 * - blocking: 미리 생성되지 않은 경로는 SSR 방식으로 처리
 * - true: 미리 생성되지 않은 경로는 폴백 상태의 페이지를 먼저 보여주고,
 *         백그라운드에서 페이지를 생성한 후 업데이트
 */
export const getStaticPaths = () => {
  return {
    paths: [
      { params: { id: "1" } },
      { params: { id: "2" } },
      { params: { id: "3" } },
    ],
    fallback: true,
    // false: 404 NotFound
    // blocking : SSR 방식
    // true: SRR 방식 + 데이터가 없는 폴백 상태의 페이지부터 반환해주고 나머지는 빌드 시점에 미리 생성
  };
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  // URL 파라미터에서 도서 ID 추출
  const id = context.params!.id;
  // 해당 ID의 도서 정보 조회
  const book = await fecthOneBook(Number(id));

  if (!book) {
    return {
      notFound: true,
    };
  }

  console.log(id);
  return {
    props: { book },
  };
};

/**
 * 도서 상세 정보를 표시하는 페이지 컴포넌트
 * @param book - 빌드 시점에 가져온 도서 정보
 *
 * 폴백 상태 처리:
 * - router.isFallback: 페이지가 아직 서버로부터 데이터를 받지 못한 상태
 * - 이 상태에서는 로딩 UI를 표시하여 사용자 경험 개선
 * - 데이터가 준비되면 자동으로 페이지가 업데이트됨
 */
export default function Page({
  book,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  // 도서 정보가 없는 경우 에러 메시지 표시
  // fallback 상태: 페이지 컴포넌트가 아직 서버로부터 데이터를 전달받지 못한 상태
  const router = useRouter();
  // 로딩중이면 아래, 아니라면 문제가 발생했습니다 문구
  if (router.isFallback) {
    return (
      <>
        <Head>
          <title>한입북스</title>
          <meta property="og:image" content="/thumbnail.png" />
          <meta property="og:title" content="한입북스" />
          <meta
            property="og:description"
            content="한입 북스에 등록된 도서들을 만나보세요"
          />
          <div>로딩중입니다</div>
        </Head>
      </>
    );
  }

  // 도서 정보가 없는 경우 에러 메시지 표시
  if (!book) {
    return "문제가 발생했습니다 다시 시도하세요";
  }

  // 도서 정보 구조 분해 할당
  const { title, subTitle, author, coverImgUrl, description, publisher } = book;
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:image" content={coverImgUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
      </Head>
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
    </>
  );
}

/**
 * 코드 실행 흐름:
 * 1. 빌드 시점에 getStaticPaths로 생성할 페이지 경로 결정
 * 2. 각 경로에 대해 getStaticProps로 데이터 페칭
 * 3. 페칭된 데이터로 정적 페이지 생성
 * 4. 클라이언트 요청 시:
 *    - 미리 생성된 페이지가 있으면 즉시 제공
 *    - 없는 경우 폴백 상태의 페이지를 보여주고 백그라운드에서 생성
 *
 * 주요 기능:
 * - SSG를 통한 성능 최적화
 * - 동적 라우팅 처리
 * - 정적 페이지 생성
 * - 도서 상세 정보 표시
 * - 에러 상황 처리
 * - 폴백 상태 처리
 *
 * 변경사항 요약:
 * - SSR에서 SSG로 전환하여 성능 개선
 * - 모든 도서 ID에 대한 정적 페이지 미리 생성
 * - 빌드 시점에 데이터 페칭 및 페이지 생성
 * - 폴백 상태 처리 로직 추가로 사용자 경험 개선
 */
