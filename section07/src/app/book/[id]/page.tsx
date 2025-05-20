import { notFound } from "next/navigation";
import style from "./page.module.css";
import { createReviewAction } from "@/actions/create-review.action";

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

// 리뷰 작성 폼 컴포넌트
// 서버 액션을 사용하여 리뷰 데이터를 처리
function ReviewEditor({ bookId }: { bookId: string }) {
  return (
    <section>
      {/* form의 action 속성에 서버 액션 함수를 연결 */}
      <form action={createReviewAction}>
        {/* hidden 애트리뷰트가 있다면 모두 readOnly를 추가해야한다 */}
        <input name="bookId" value={bookId} hidden readOnly />
        <input required name="content" placeholder="리뷰 내용" />
        <input required name="author" placeholder="작성자" />
        <button type="submit">작성하기</button>
      </form>
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
    </div>
  );
}
