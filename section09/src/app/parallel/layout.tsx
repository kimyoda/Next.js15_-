import Link from "next/link";
import { ReactNode } from "react";

/**
 * Parallel Routes (병렬 라우트)는 Next.js 13에서 도입된 기능으로,
 * 동시에 여러 페이지를 같은 레이아웃에서 렌더링할 수 있게 해줍니다.
 *
 * @slot sidebar - 사이드바 컴포넌트를 위한 슬롯
 * @slot feed - 피드 컴포넌트를 위한 슬롯
 * @param children - 기본 페이지 컨텐츠
 */
export default function Layout({
  children,
  sidebar,
  feed,
}: {
  children: ReactNode;
  sidebar: ReactNode;
  feed: ReactNode;
}) {
  return (
    <div>
      {/* 네비게이션 링크 */}
      <div>
        <Link href={"/parallel"}>paralle</Link>
        &nbsp;
        <Link href={"/parallel/setting"}>paralle/setting</Link>
      </div>
      <br />
      {/* 
        @folder 구조 (@sidebar, @feed)를 사용하는 이유:
        1. 독립적인 로딩 상태: 각 슬롯은 독립적으로 로딩 상태를 가질 수 있습니다.
        2. 부분적 새로고침: 특정 슬롯만 새로고침이 가능합니다.
        3. 병렬 데이터 페칭: 각 슬롯은 독립적으로 데이터를 가져올 수 있습니다.
        4. default.tsx: 슬롯에 대한 기본 컴포넌트를 제공합니다.
      */}
      {sidebar}
      {feed}
      {children}
    </div>
  );
}
