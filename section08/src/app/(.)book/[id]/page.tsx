import BookPage from "@/app/book/[id]/page";
import Modal from "@/components/modal";

/**
 * 인터셉트 라우팅을 사용한 모달 페이지
 *
 * (.) 접두사는 현재 세그먼트에서 인터셉트를 수행함을 의미
 * 이 페이지는 /book/[id] 경로로의 이동을 가로채서 모달 형태로 표시
 *
 * @param props - 라우트 파라미터와 기타 페이지 속성들
 */
export default function Page(props: any) {
  return (
    <div>
      가로채기 성공!
      <Modal>
        <BookPage {...props} />
      </Modal>
    </div>
  );
}
