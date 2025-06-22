"use client";
/**
 * ReviewEditor 컴포넌트
 *
 * 이 컴포넌트는 도서에 대한 리뷰를 작성할 수 있는 폼을 제공합니다.
 * Next.js의 서버 액션을 사용하여 리뷰 데이터를 처리합니다.
 *
 * Props:
 * @param {string} bookId - 리뷰를 작성할 도서의 고유 식별자
 */
import style from "./review-editor.module.css";
import { createReviewAction } from "@/actions/create-review.action";
// React 19에서 추가된 useActionState 훅을 사용하여 서버 액션의 상태를 관리
import { useActionState, useEffect } from "react";

// 리뷰 작성 폼 컴포넌트
// 서버 액션을 사용하여 리뷰 데이터를 처리
export default function ReviewEditor({ bookId }: { bookId: string }) {
  // useActionState 훅을 사용하여 서버 액션의 상태를 관리
  // state: 서버 액션의 실행 결과를 담는 상태
  // formAction: 폼 제출 시 실행될 서버 액션 함수
  // isPending: 서버 액션이 실행 중인지 여부를 나타내는 상태
  const [state, formAction, isPedning] = useActionState(
    createReviewAction,
    null
  );

  // 서버 액션 실행 결과에 따른 에러 처리
  // state가 변경될 때마다 실행되며, 에러가 있는 경우 알림을 표시
  useEffect(() => {
    if (state && !state.status) {
      alert(state.error);
    }
  }, [state]);

  return (
    <section>
      {/* 
        form의 action 속성에 서버 액션 함수를 연결하여 
        폼 제출 시 서버에서 리뷰 데이터를 처리하도록 합니다.
        클라이언트 컴포넌트에서 서버 액션을 직접 사용할 수 있습니다.
      */}
      <form className={style.form_container} action={formAction}>
        {/* 
          bookId는 hidden input으로 전달되며,
          readOnly 속성을 추가하여 사용자가 수정할 수 없도록 합니다.
          이는 보안을 위한 조치입니다.
        */}
        <input name="bookId" value={bookId} hidden readOnly />
        {/* 
          리뷰 내용을 입력받는 textarea
          isPending 상태에 따라 disabled 속성이 동적으로 변경됩니다.
          이는 중복 제출을 방지하고 사용자에게 피드백을 제공합니다.
        */}
        <textarea
          disabled={isPedning}
          required
          name="content"
          placeholder="리뷰 내용"
        />
        <div className={style.submit_container}>
          {/* 
            리뷰 작성자 이름을 입력받는 input
            isPending 상태에 따라 disabled 속성이 동적으로 변경됩니다.
          */}
          <input
            disabled={isPedning}
            required
            name="author"
            placeholder="작성자"
          />
          {/* 
            제출 버튼
            isPending 상태에 따라 버튼의 텍스트가 변경되고 disabled 됩니다.
            이는 사용자에게 현재 처리 중임을 시각적으로 알려줍니다.
          */}
          <button disabled={isPedning} type="submit">
            {isPedning ? "..." : "작성하기"}
          </button>
        </div>
      </form>
    </section>
  );
}
