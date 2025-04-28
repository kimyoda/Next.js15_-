import "./globals.css";
import Link from "next/link";
import style from "./layout.module.css";
import { BookData } from "@/types";

async function Footer() {
  // 기본 캐싱: 레이아웃에서도 정적 생성 캐시를 사용합니다.
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`
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

// 루트 레이아웃 컴포넌트
// 모든 페이지에 공통적으로 적용되는 레이아웃을 정의합니다.
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
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
      </body>
    </html>
  );
}
