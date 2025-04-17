// Next.js App Router의 검색 페이지 컴포넌트
// app/search/page.tsx는 '/search' 경로에 해당하는 페이지를 정의합니다.
// searchParams를 통해 URL 쿼리 파라미터를 받아올 수 있습니다.
// 이 컴포넌트는 서버 컴포넌트로, 비동기 처리가 가능합니다.
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q: string }>;
}) {
  const { q } = await searchParams;
  return <div>Search 페이지: {q}</div>;
}
