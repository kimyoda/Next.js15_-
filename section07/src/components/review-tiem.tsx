/**
 * ReviewItem 컴포넌트
 *
 * 이 컴포넌트는 개별 리뷰 항목을 표시합니다.
 * 리뷰의 작성자, 내용, 작성 시간을 보여주며 삭제 기능을 제공합니다.
 *
 * Props:
 * @param {string} id - 리뷰의 고유 식별자
 * @param {string} content - 리뷰 내용
 * @param {string} author - 리뷰 작성자
 * @param {string} createdAt - 리뷰 작성 시간
 * @param {string} bookId - 리뷰가 속한 도서의 고유 식별자
 */
import { ReviewData } from "@/types";
import style from "./review-item.module.css";
import ReviewItemDeleteButton from "./review-item-delete-button";

export default function ReviewItem({
  id,
  content,
  author,
  createdAt,
  bookId,
}: ReviewData) {
  return (
    <div className={style.container}>
      {/* 리뷰 작성자 표시 */}
      <div className={style.author}>{author}</div>
      {/* 리뷰 내용 표시 */}
      <div className={style.content}>{content}</div>
      <div className={style.bottom_container}>
        {/* 작성 시간을 로컬 시간 형식으로 변환하여 표시 */}
        <div className={style.date}>{new Date(createdAt).toLocaleString()}</div>
        {/* 리뷰 삭제 버튼 */}
        <div className={style.delete_btn}>
          <ReviewItemDeleteButton reviewId={id} bookId={bookId} />
        </div>
      </div>
    </div>
  );
}
