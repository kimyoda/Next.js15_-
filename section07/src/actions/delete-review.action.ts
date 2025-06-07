"use server";

import { revalidateTag } from "next/cache";

// 리뷰 삭제를 처리하는 서버 액션
export async function deleteReviewAction(_: any, formData: FormData) {
  // 폼 데이터에서 리뷰 ID와 책 ID를 가져옵니다
  const reviewId = formData.get("reviewId")?.toString();
  const bookId = formData.get("bookId")?.toString();

  // 리뷰 ID가 없는 경우 에러를 반환합니다
  if (!reviewId) {
    return {
      status: false,
      error: "삭제할 리뷰가 없습니다",
    };
  }

  try {
    // API 서버에 DELETE 요청을 보냅니다
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review/${reviewId}`,
      {
        method: "DELETE",
      }
    );

    // 응답이 실패한 경우 에러를 발생시킵니다
    if (!response.ok) {
      throw new Error(response.statusText);
    }

    // 해당 책의 리뷰 캐시를 무효화하여 UI를 갱신합니다
    revalidateTag(`review-${bookId}`);

    // 성공 상태를 반환합니다
    return {
      status: true,
      error: "",
    };
  } catch (err) {
    // 에러 발생 시 에러 메시지와 함께 실패 상태를 반환합니다
    return {
      status: false,
      error: `리뷰 삭제에 실패했습니다 : ${err}`,
    };
  }
}
