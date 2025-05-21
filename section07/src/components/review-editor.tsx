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
// 리뷰 작성 폼 컴포넌트
// 서버 액션을 사용하여 리뷰 데이터를 처리
export default function ReviewEditor({ bookId }: { bookId: string }) {
  return (
    <section>
      {/* 
        form의 action 속성에 서버 액션 함수를 연결하여 
        폼 제출 시 서버에서 리뷰 데이터를 처리하도록 합니다.
      */}
      <form className={style.form_container} action={createReviewAction}>
        {/* 
          bookId는 hidden input으로 전달되며,
          readOnly 속성을 추가하여 사용자가 수정할 수 없도록 합니다.
        */}
        <input name="bookId" value={bookId} hidden readOnly />
        {/* 리뷰 내용을 입력받는 textarea */}
        <textarea required name="content" placeholder="리뷰 내용" />
        <div className={style.submit_container}>
          {/* 리뷰 작성자 이름을 입력받는 input */}
          <input required name="author" placeholder="작성자" />
          <button type="submit">작성하기</button>
        </div>
      </form>
    </section>
  );
}
