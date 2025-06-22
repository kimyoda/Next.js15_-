/**
 * /parallel 경로의 기본 페이지 컴포넌트
 *
 * 이 컴포넌트는 /parallel 경로에서 children으로 렌더링됩니다.
 * Parallel Routes 구조에서:
 * 1. 이 컴포넌트는 @sidebar와 @feed 슬롯 사이에 표시됩니다.
 * 2. 각 슬롯(@sidebar, @feed)은 독립적으로 동작하면서
 *    이 기본 컨텐츠와 함께 표시됩니다.
 * 3. 슬롯들이 변경되어도 이 기본 컨텐츠는 유지됩니다.
 * 4. 해당 페이즈는 새로고침을 해도 에러가 나오지 않도록 방지하는 페이지이다.
 */
export default function Default() {
  return <div>/parallel/default</div>;
}
