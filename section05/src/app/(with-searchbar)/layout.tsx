import { ReactNode, Suspense } from "react";
import Searchbar from "../../components/searchbar";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      {/* Suspense는 미완성 즉, 미완성 상태로 남겨지게 된다. 곧바로 렌더링 하지 않는다.  해당 컴포넌트의 비동기 동작이 끝나기전까지! */}
      <Suspense fallback={<div>Loading ...</div>}>
        <Searchbar />
      </Suspense>
      {children}
    </div>
  );
}
