import { useRouter } from "next/router";

export default function Page() {
  // useRouter로 query 쿼리스트링을 사용할 수 있다.
  const router = useRouter();

  const { q } = router.query;

  return <h1>Search {q}</h1>;
}
