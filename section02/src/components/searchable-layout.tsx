import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";
import style from "./searchable-layout.module.css";

export default function SearchableLayout({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  // query q가 string 이거나 string[]로 오기 떄문에 타입 단언으로 string으로 받도록 한다.
  const q = router.query.q as string;

  useEffect(() => {
    setSearch(q || "");
  }, [q]);

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  // search 숫자 이벤트
  const onSubmit = () => {
    if (!search || q === search) return;

    router.push(`/search?q=${search}`);
  };
  // Enter 키 입력 이벤트
  const onkeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSubmit();
    }
  };

  return (
    <div>
      <div className={style.searchbar_container}>
        <input
          value={search}
          onKeyDown={onkeyDown}
          onChange={onChangeSearch}
          placeholder="검색어를 입력해주세요..."
        />
        <button onClick={onSubmit}>검색</button>
      </div>
      {children}
    </div>
  );
}
