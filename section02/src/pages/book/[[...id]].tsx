import { useRouter } from "next/router";

// ...을 붙이면 catch all segment 모든 구간에 대응하는 페이지는 ...을 붙인다.
// 범용적으로 하고싶다면 []로 한번 더 감싼다. -> optional catch allsegment라고 한다.
export default function Page() {
  // book/{id}
  const router = useRouter();

  const { id } = router.query;

  console.log(id);

  return <h1>Book {id}</h1>;
}
