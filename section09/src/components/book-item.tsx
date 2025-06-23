// 책 아이템 컴포넌트
// 각 책의 정보를 표시하고 해당 책의 상세 페이지로 이동할 수 있는 링크를 제공합니다.
import type { BookData } from "@/types";
import Link from "next/link";
import style from "./book-item.module.css";
import Image from "next/image";

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
      {/*
        next/image의 Image 컴포넌트를 사용하면 이미지가 자동으로 최적화됩니다.
        - 다양한 해상도와 포맷(WebP 등)으로 변환되어 전송되어 트래픽과 로딩 속도가 개선됩니다.
        - Lazy loading, responsive image, placeholder 등 다양한 최적화 기능이 내장되어 있습니다.
        - 성능 개선 및 SEO에 도움이 됩니다.
        아래 코드는 도서 표지 이미지를 최적화하여 렌더링합니다.
      */}
      <Image
        src={coverImgUrl}
        width={80}
        height={105}
        alt={`도서 ${title}의 표지 이미지`}
      />
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
