import { notFound } from "next/navigation";
import style from "./page.module.css";
import { ReviewData } from "@/types";
import ReviewItem from "@/components/review-tiem";
import ReviewEditor from "@/components/review-editor";

// 지정된 url 파라미터 외에 다른 url은 false로 처리한다.
// export const dynamicParams = true;

// 3가지의 정적인 URL 파라미터를 담은 함수를 내보낸다.
// 주의할점 1. URL 파라미터의 값을 명시할 때는 문자열 데이터로만 명시해야한다.
// 2. Params라는 함수를 내보내게 되면, 무조건 해당하는 페이지가 static페이지로 강제로 설정된다.
export function generateStaticParams() {
  return [{ id: "1" }, { id: "2" }, { id: "3" }];
}

// 책 상세 정보를 가져오는 컴포넌트
// API 서버에서 책 정보를 가져와서 화면에 표시
async function BookDetail({ bookId }: { bookId: string }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/${bookId}`
  );

  if (!response.ok) {
    if (response.status === 404) {
      notFound();
    }
    return <div>오류가 발생했습니다!</div>;
  }

  const book = await response.json();

  const { title, subTitle, description, author, publisher, coverImgUrl } = book;

  return (
    <section>
      <div
        className={style.cover_img_container}
        style={{ backgroundImage: `url('${coverImgUrl}')` }}
      >
        <img src={coverImgUrl} />
      </div>
      <div className={style.title}>{title}</div>
      <div className={style.subTitle}>{subTitle}</div>
      <div className={style.author}>
        {author} | {publisher}
      </div>
      <div className={style.description}>{description}</div>
    </section>
  );
}

/**
 * ReviewList 컴포넌트
 *
 * 이 컴포넌트는 특정 도서에 대한 모든 리뷰를 가져와서 표시합니다.
 * 서버 컴포넌트로 구현되어 있어 서버 사이드에서 데이터를 가져옵니다.
 *
 * Props:
 * @param {string} bookId - 리뷰를 조회할 도서의 고유 식별자
 */
async function ReviewList({ bookId }: { bookId: string }) {
  // API 서버에서 해당 도서의 리뷰 목록을 가져옵니다
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review/book/${bookId}`,
    { next: { tags: [`reviews-${bookId}`] } }
  );

  // API 응답이 실패한 경우 에러를 발생시킵니다
  if (!response.ok) {
    throw new Error(`Review fetch failed: ${response.statusText}`);
  }

  // 응답 데이터를 ReviewData 타입의 배열로 변환합니다
  const reviews: ReviewData[] = await response.json();

  return (
    <section>
      {/* 각 리뷰 데이터를 ReviewItem 컴포넌트로 렌더링합니다 */}
      {reviews.map((review) => (
        <ReviewItem key={`review-item-${review.id}`} {...review} />
      ))}
    </section>
  );
}

// 메인 페이지 컴포넌트
// URL 파라미터로부터 책 ID를 받아서 BookDetail과 ReviewEditor 컴포넌트를 렌더링
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className={style.container}>
      <BookDetail bookId={id} />
      <ReviewEditor bookId={id} />
      <ReviewList bookId={id} />
    </div>
  );
}
