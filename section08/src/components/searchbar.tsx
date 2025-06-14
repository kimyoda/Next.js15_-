"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import style from "./serachbar.module.css";

// 검색바 컴포넌트
// 사용자로부터 검색어를 입력받고 검색 결과 페이지로 이동하는 기능을 제공합니다.
export default function Searchbar() {
  // Next.js의 라우터와 검색 파라미터 훅 사용
  const router = useRouter();
  // 비동기로 동작하는 리액트 훅
  const searchParams = useSearchParams();
  // 검색어 상태 관리
  const [search, setSearch] = useState("");

  // URL에서 검색어 파라미터 가져오기
  const q = searchParams.get("q");

  // URL의 검색어가 변경될 때마다 입력 필드 업데이트
  useEffect(() => {
    setSearch(q || "");
  }, [q]);

  // 검색어 입력 핸들러
  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  // 검색 제출 핸들러
  const onSubmit = () => {
    // 검색어가 비어있거나 현재 검색어와 동일한 경우 검색하지 않음
    if (!search || q === search) return;
    // 검색 결과 페이지로 이동
    router.push(`/search?q=${search}`);
  };

  // 엔터 키 입력 핸들러
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSubmit();
    }
  };

  return (
    <div className={style.container}>
      {/* 검색어 입력 필드 */}
      <input value={search} onChange={onChangeSearch} onKeyDown={onKeyDown} />
      {/* 검색 버튼 */}
      <button onClick={onSubmit}>검색</button>
    </div>
  );
}
