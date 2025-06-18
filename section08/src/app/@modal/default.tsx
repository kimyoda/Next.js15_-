/**
 * 패럴랠 라우트 슬롯의 기본 페이지
 *
 * @modal 슬롯이 활성화되지 않았을 때 렌더링되는 기본 컴포넌트
 * null을 반환하여 아무것도 표시하지 않음
 *
 * 이는 패럴랠 라우트가 선택적(optional)임을 보장하며,
 * 모달이 필요하지 않은 경우 레이아웃에 영향을 주지 않음
 */
export default function Default() {
  return null;
}
