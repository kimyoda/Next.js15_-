// 서버 액션 함수 정의
// 'use server' 지시문을 사용하여 이 함수가 서버에서 실행됨을 명시
// formData를 통해 클라이언트에서 전송된 데이터를 받아서 처리
// 파일을 따로 만들었을때는 가장 최상단에 서버 액션을 위한 코드임을 나타내기 위해 최상단에 위치한다.
"use server";

import { revalidatePath } from "next/cache";

export async function createReviewAction(formData: FormData) {
  const bookId = formData.get("bookId")?.toString();
  const content = formData.get("content")?.toString();
  const author = formData.get("author")?.toString();

  // 예외처리 추가 값이 없으면 리턴
  if (!content || !author || !bookId) {
    return;
  }

  try {
    // API 호출 관련 코드
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review`,
      {
        method: "POST",
        body: JSON.stringify({ bookId, content, author }),
      }
    );
    console.log(response.status);
    // 재검증하는 next에서 제공하는 기능
    // 1. 오직 서버측에서만 호출할 수 있는 메서드다.
    // 1. 서버컴포넌트 내부에서만 가능하고 클라이언트 컴포넌트에서는 호출이 불가능하다.
    // 2. 해당 경로에 해당하는 페이지를 전부 재검증을 시키기 때문에 모든 cache들까지 전부 무효화를 시킨다.
    // 3. 페이지 자체를 cache하는 full route cahce삭제 무효화할 뿐 저장을 하진 않는다.
    revalidatePath(`/book/${bookId}`);
    // 에러코드 확인
  } catch (err) {
    console.error(err);
    return;
  }
}
