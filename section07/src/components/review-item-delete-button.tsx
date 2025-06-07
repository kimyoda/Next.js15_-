"use client";

// 리뷰 삭제 액션을 가져옵니다
import { deleteReviewAction } from "@/actions/delete-review.action";
import { useActionState, useEffect, useRef } from "react";

// 리뷰 삭제 버튼 컴포넌트
export default function ReviewItemDeleteButton({
  reviewId,
  bookId,
}: {
  reviewId: number;
  bookId: number;
}) {
  // 폼 요소에 대한 참조를 생성합니다
  const formRef = useRef<HTMLFormElement>(null);

  // 서버 액션의 상태를 관리합니다
  const [state, formAction, isPending] = useActionState(
    deleteReviewAction,
    null
  );

  // 액션 실행 후 상태가 변경될 때마다 에러가 있다면 알림을 표시합니다
  useEffect(() => {
    if (state && !state.status) {
      alert(state.error);
    }
  }, [state]);

  return (
    <form ref={formRef} action={formAction}>
      {/* 리뷰 ID를 숨겨진 입력 필드로 전달합니다 */}
      <input name="reviewId" defaultValue={reviewId} readOnly hidden />
      {/* 책 ID를 숨겨진 입력 필드로 전달합니다 */}
      <input name="bookd" defaultValue={bookId} hidden />
      {/* 로딩 중일 때는 로딩 표시를, 아닐 때는 삭제 버튼을 표시합니다 */}
      {isPending ? (
        <div>...</div>
      ) : (
        <div onClick={() => formRef.current?.requestSubmit()}>삭제하기</div>
      )}
    </form>
  );
}
