import "./globals.css";
import Link from "next/link";
import style from "./layout.module.css";

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
          <footer>제작 @winterlood</footer>
        </div>
      </body>
    </html>
  );
}
