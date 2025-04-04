/**
 * 랜덤 도서 목록을 가져오는 기능을 담당하는 모듈
 *
 * BookData 타입:
 * - 도서의 기본 정보를 담고 있는 타입 정의를 types에서 가져옴
 */
import { BookData } from "@/types";

/**
 * 서버로부터 랜덤하게 선택된 도서 목록을 가져오는 비동기 함수
 * @returns Promise<BookData[]> - 랜덤 도서 데이터 배열을 담은 Promise
 */
export default async function fetchRandomBooks(): Promise<BookData[]> {
  // 랜덤 도서 목록을 조회하기 위한 API 엔드포인트 URL 설정
  const url = `http://localhost:12345/book/random`;

  try {
    // fetch API를 사용하여 서버에 GET 요청
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error();
    }
    // 응답 데이터를 JSON 형식으로 파싱하여 반환
    return await response.json();
  } catch (err) {
    // 에러 발생 시 콘솔에 에러 출력 후 빈 배열 반환
    console.error(err);
    return [];
  }
}

/**
 * 코드 실행 흐름:
 * 1. 랜덤 도서 목록 조회를 위한 API URL 설정
 * 2. 서버에 비동기 요청 실행
 * 3. 정상 응답시 랜덤 도서 데이터 배열 반환
 * 4. 오류 발생시 빈 배열 반환
 *
 * 주요 기능:
 * - 랜덤 도서 목록 조회
 * - 추천 도서 기능 지원
 * - 서버 오류 상황 대응
 */
