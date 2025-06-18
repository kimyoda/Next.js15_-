import BookPage from "@/app/book/[id]/page";
import Modal from "@/components/modal";

/**
 * 패럴랠 라우트와 인터셉팅 라우트를 결합한 모달 페이지
 *
 * 파일 구조 설명:
 * - @modal: 패럴랠 라우트 슬롯 (동시에 렌더링되는 별도 레이아웃)
 * - (.)book: 인터셉팅 라우트 (현재 세그먼트에서 /book 경로를 가로챔)
 * - [id]: 동적 라우트 파라미터
 *
 * 작동 방식:
 * 1. 사용자가 /book/[id] 경로로 이동하려고 할 때
 * 2. (.) 접두사로 인해 이 페이지가 해당 라우트를 가로챔
 * 3. 패럴랠 라우트(@modal)로 인해 모달 형태로 렌더링됨
 * 4. 원래 BookPage 컴포넌트를 Modal로 감싸서 표시
 *
 * @param props - 라우트 파라미터와 기타 페이지 속성들
 */
export default function Page(props: any) {
  return (
    <Modal>
      <BookPage {...props} />
    </Modal>
  );
}
