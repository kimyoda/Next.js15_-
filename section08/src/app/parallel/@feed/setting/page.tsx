/**
 * @feed 슬롯의 setting 페이지 컴포넌트
 *
 * 이 컴포넌트는 /parallel/setting 경로에서 @feed 슬롯에 표시됩니다.
 * Parallel Routes의 장점을 활용하여:
 * 1. setting 페이지로 이동할 때 @feed 슬롯만 업데이트됩니다.
 * 2. 다른 슬롯들(@sidebar)은 그대로 유지됩니다.
 * 3. 전체 페이지 새로고침 없이 부분적으로 업데이트가 가능합니다.
 */
export default function Page() {
  return <div>@feed/setting</div>;
}
