// Next.js App Router의 검색 페이지 컴포넌트
// app/search/page.tsx는 '/search' 경로에 해당하는 페이지를 정의합니다.
// searchParams를 통해 URL 쿼리 파라미터를 받아올 수 있습니다.

import ClientComponent from "../../../components/clinet-component";

// 이 컴포넌트는 서버 컴포넌트로, 비동기 처리가 가능합니다.
// 서버와 클라이언트 컴포넌트를 혼합해서 사용하는 페이지
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  console.log("검색어 q:", q); // 여기에 서버 로그 출력

  return (
    <div>
      <p>검색어가 있을까?: {q ? "✅ 있음" : "❌ 없음"}</p>
      <p>검색어: {q ?? "없음"}</p>
      <ClientComponent>
        <></>
      </ClientComponent>
    </div>
  );
}
