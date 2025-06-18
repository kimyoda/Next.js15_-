import "./globals.css";
import Link from "next/link";
import style from "./layout.module.css";
import { BookData } from "@/types";
import { ReactNode } from "react";

async function Footer() {
  // 기본 캐싱: 레이아웃에서도 정적 생성 캐시를 사용합니다.
  // 새로운 도서를 추가하는 기능이 없기에 강제로 cache를 추가해도 큰 상관이 없다.
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`,
    {
      cache: "force-cache",
    }
  );

  if (!response.ok) {
    return <footer>제작 @winterlood</footer>;
  }

  const books: BookData[] = await response.json();

  const bookCount = books.length;

  return (
    <footer>
      <div>제작 @winterlood</div>
      <div>{bookCount}개의 도서가 등록되어 있습니다</div>
    </footer>
  );
}

/**
 * 루트 레이아웃 컴포넌트
 *
 * 패럴랠 라우트 구조:
 * - children: 메인 페이지 콘텐츠
 * - modal: 패럴랠 라우트 슬롯 (@modal 폴더의 콘텐츠)
 *
 * 패럴랠 라우트의 장점:
 * 1. 동시에 여러 페이지를 렌더링 가능
 * 2. 모달과 메인 페이지가 독립적으로 관리됨
 * 3. URL 상태와 모달 상태를 분리하여 관리
 *
 * @param children - 메인 페이지 콘텐츠
 * @param modal - 패럴랠 라우트로 렌더링될 모달 콘텐츠
 */
export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {/* 전체 컨테이너 */}
        <div className={style.container}>
          {/* 헤더 영역 - 로고 및 네비게이션 */}
          <header>
            <Link href={"/"}>📚 ONEBITE BOOKS</Link>
          </header>
          {/* 메인 콘텐츠 영역 */}
          <main>{children}</main>
          {/* 푸터 영역 */}
          <Footer />
        </div>
        {/* 
          패럴랠 라우트로 렌더링되는 모달 슬롯
          @modal 폴더의 콘텐츠가 여기에 렌더링됨
          인터셉팅 라우트와 결합하여 모달 형태로 표시
        */}
        {modal}
        {/* 
          모달 포털을 위한 루트 엘리먼트
          createPortal을 사용하여 모달이 이 위치에 렌더링됨
          이는 모달이 다른 DOM 위치에 렌더링되어 z-index나 스타일링 문제를 방지
        */}
        <div id="modal-root"></div>
      </body>
    </html>
  );
}
