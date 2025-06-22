// 책 아이템 컴포넌트
// 각 책의 정보를 표시하고 해당 책의 상세 페이지로 이동할 수 있는 링크를 제공합니다.
import type { BookData } from "@/types";
import Link from "next/link";
import style from "./book-item.module.css";

export default function BookItem({
  id,
  title,
  subTitle,
  description,
  author,
  publisher,
  coverImgUrl,
}: BookData) {
  return (
    // Link 컴포넌트를 사용하여 클라이언트 사이드 네비게이션 구현
    // href에 동적 라우팅을 사용하여 각 책의 상세 페이지로 이동
    <Link href={`/book/${id}`} className={style.container}>
      {/* 책 표지 이미지 */}
      <img src={coverImgUrl} />
      <div>
        {/* 책 제목 */}
        <div className={style.title}>{title}</div>
        {/* 책 부제목 */}
        <div className={style.subTitle}>{subTitle}</div>
        <br />
        {/* 저자와 출판사 정보 */}
        <div className={style.author}>
          {author} | {publisher}
        </div>
      </div>
    </Link>
  );
}
