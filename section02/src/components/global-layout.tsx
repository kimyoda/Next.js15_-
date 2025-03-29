import Link from "next/link";
import { ReactNode } from "react";
import style from "./golba-layout.module.css";
// 글로벌 레이아웃 컴포넌트
export default function GlobalLayout({ children }: { children: ReactNode }) {
  return (
    <div className={style.containger}>
      <header className={style.header}>
        <Link href={"/"}>📚 ONEBITE BOOKS</Link>
      </header>
      <main className={style.main}>{children}</main>
      <footer className={style.footer}>제작 @masteryoda</footer>
    </div>
  );
}
