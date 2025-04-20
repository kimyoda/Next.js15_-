// Next.js App Router의 책 상세 페이지 컴포넌트
// app/book/[[...id]]/page.tsx는 동적 라우팅을 사용하는 페이지입니다.
// [[...id]]는 선택적 캐치-올 세그먼트로, '/book' 또는 '/book/1' 등 다양한 경로를 처리할 수 있습니다.

import ClientComponent from "../../../components/clinet-component";

// params를 통해 동적 세그먼트의 값을 받아올 수 있습니다.
export default async function Page({
  params,
}: {
  params: Promise<{ id: string | string[] }>;
}) {
  const { id } = await params;

  return (
    <div>
      book/ [id] 페이지 {id}
      <ClientComponent>
        <></>
      </ClientComponent>
    </div>
  );
}
