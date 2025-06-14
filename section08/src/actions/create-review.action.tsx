// 서버 액션 함수 정의
// 'use server' 지시문을 사용하여 이 함수가 서버에서 실행됨을 명시
// formData를 통해 클라이언트에서 전송된 데이터를 받아서 처리
// 파일을 따로 만들었을때는 가장 최상단에 서버 액션을 위한 코드임을 나타내기 위해 최상단에 위치한다.
"use server";

import { delay } from "@/util/delay";
import { revalidatePath, revalidateTag } from "next/cache";

// createReviewAction: 리뷰를 생성하는 서버 액션 함수
// _: 첫 번째 매개변수는 사용하지 않지만, 서버 액션의 규칙상 필요
// formData: 클라이언트에서 전송된 폼 데이터를 받는 매개변수
export async function createReviewAction(_: any, formData: FormData) {
  // formData에서 필요한 데이터 추출
  const bookId = formData.get("bookId")?.toString();
  const content = formData.get("content")?.toString();
  const author = formData.get("author")?.toString();

  // 예외처리 추가 값이 없으면 리턴
  if (!content || !author || !bookId) {
    return {
      status: false,
      error: "리뷰 내용과 작성자를 입력해주세요",
    };
  }

  try {
    // API 호출 관련 코드
    // 실제 API 호출 전에 2초 지연을 주어 로딩 상태를 시뮬레이션
    await delay(2000);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review`,
      {
        method: "POST",
        body: JSON.stringify({ bookId, content, author }),
      }
    );
    console.log(response.status);

    // Next.js의 캐시 재검증 기능들에 대한 설명
    // revalidatePath와 revalidateTag는 서버 컴포넌트에서만 사용 가능한 함수들입니다.
    // 이 함수들은 데이터가 변경되었을 때 Next.js의 캐시를 무효화하고 새로운 데이터를 가져오도록 합니다.

    // 1. revalidatePath: 특정 경로의 캐시를 재검증
    // - 특정 페이지만 재검증: revalidatePath(`/book/${bookId}`)
    // - 동적 라우트의 모든 페이지 재검증: revalidatePath("/book/[id]", "page")
    // - 특정 레이아웃의 모든 페이지 재검증: revalidatePath("/(with-searchbar", "layout")
    // - 전체 애플리케이션 재검증: revalidatePath("/", "layout")

    // 2. revalidateTag: 특정 태그와 관련된 캐시만 재검증
    // - 더 세밀한 캐시 제어가 가능하며, 특정 데이터만 선택적으로 재검증 가능
    // - 태그 기반으로 캐시를 관리하므로 성능상 이점이 있음

    if (!response.ok) {
      throw new Error(response.statusText);
    }
    // 리뷰가 생성된 특정 도서의 캐시만 재검증
    revalidateTag(`review-${bookId}`);
    return {
      status: true,
      error: "",
    };
  } catch (err) {
    return {
      status: false,
      error: `리뷰 작성에 실패했습니다 : ${err}`,
    };
  }
}
