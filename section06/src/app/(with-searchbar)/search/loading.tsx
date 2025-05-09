// 비동기로 작동하도록 설정된  페이지 컴포넌트에만 스트리밍을 제공한다(async)
// 무조건 페이지 컴포넌트에만 스트리밍을 적용시킬 수 있다.
// 브라우저에서 쿼리스트링이 변경될 때에는 트리거가 작동되지 않는다.
export default function Loading() {
  return <div>Loading ...</div>;
}
