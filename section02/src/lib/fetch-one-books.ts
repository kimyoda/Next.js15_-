/**
 * 단일 도서 정보를 가져오는 기능을 담당하는 모듈
 *
 * BookData 타입:
 * - 도서의 상세 정보를 담고 있는 타입 정의를 types에서 가져옴
 */
import { BookData } from "@/types";

/**
 * 특정 ID의 도서 정보를 서버로부터 가져오는 비동기 함수
 * @param id - 조회할 도서의 고유 ID
 * @returns Promise<BookData | null> - 도서 데이터 또는 실패시 null을 반환하는 Promise
 */
export default async function fecthOneBook(
  id: number
): Promise<BookData | null> {
  // 특정 도서를 조회하기 위한 API 엔드포인트 URL 설정
  const url = `http://localhost:12345/book/${id}`;

  try {
    // fetch API를 사용하여 서버에 GET 요청
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error();
    }
    // 응답 데이터를 JSON 형식으로 파싱하여 반환
    return await response.json();
  } catch (err) {
    // 에러 발생 시 콘솔에 에러 출력 후 null 반환
    console.error(err);
    return null;
  }
}

/**
 * 코드 실행 흐름:
 * 1. 함수 호출 시 도서 ID를 매개변수로 받음
 * 2. 받은 ID를 사용하여 API URL 생성
 * 3. 서버에 비동기 요청 실행
 * 4. 정상 응답시 도서 데이터 반환
 * 5. 오류 발생시 null 반환
 *
 * 주요 기능:
 * - 단일 도서 상세 정보 조회
 * - 존재하지 않는 도서 ID에 대한 처리
 * - 서버 오류 상황 대응
 */
