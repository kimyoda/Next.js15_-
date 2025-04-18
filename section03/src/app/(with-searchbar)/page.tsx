// Next.js App Router의 메인 페이지 컴포넌트
// app/page.tsx는 루트 경로('/')에 해당하는 페이지를 정의합니다.
// 이 컴포넌트는 서버 컴포넌트로, 기본적으로 서버에서 렌더링됩니다.
import styles from "./page.module.css";

export default function Home() {
  // 서버 컴포넌트는 브라우저가 아닌 서버에서만 실행된다.

  return <div className={styles.page}>인덱스 페이지</div>;
}
