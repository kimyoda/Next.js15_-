import { notFound } from "next/navigation";
import style from "./page.module.css";

// 지정된 url 파라미터 외에 다른 url은 false로 처리한다.
export const dynamicParams = true;

// 3가지의 정적인 URL 파라미터를 담은 함수를 내보낸다.
// 주의할점 1. URL 파라미터의 값을 명시할 때는 문자열 데이터로만 명시해야한다.
// 2. Params라는 함수를 내보내게 되면, 무조건 해당하는 페이지가 static페이지로 강제로 설정된다.
export function generateStaticParams() {
  return [{ id: "1" }, { id: "2" }, { id: "3" }];
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string | string[] }>;
}) {
  const { id } = await params;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/${id}`
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
    <div className={style.container}>
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
    </div>
  );
}
