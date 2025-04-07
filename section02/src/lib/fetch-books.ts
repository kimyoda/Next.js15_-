/**
 * 도서 데이터를 가져오는 기능을 담당하는 모듈
 *
 * BookData 타입:
 * - 도서의 기본 정보를 담고 있는 타입 정의를 types에서 가져옴
 */
import { BookData } from "@/types";

/**
 * 도서 데이터를 서버로부터 가져오는 비동기 함수
 * @param q - 검색어 (선택적 매개변수)
 * @returns Promise<BookData[]> - 도서 데이터 배열을 담은 Promise
 */
export default async function fetchBooks(q?: string): Promise<BookData[]> {
  // 기본 API 엔드포인트 URL 설정
  let url = `https://onebite-books-server-main-five-lyart.vercel.app/book`;

  // 검색어가 있는 경우 검색 쿼리 파라미터 추가
  if (q) {
    url += `/search?q=${q}`;
  }

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
 * 1. 함수 호출 시 선택적으로 검색어(q)를 받음
 * 2. 검색어 유무에 따라 적절한 API URL 생성
 * 3. 서버에 비동기 요청 실행
 * 4. 정상 응답시 도서 데이터 반환
 * 5. 오류 발생시 빈 배열 반환
 *
 * 주요 기능:
 * - 전체 도서 목록 조회
 * - 검색어 기반 도서 검색
 * - 에러 처리 및 예외 상황 대응
 */
