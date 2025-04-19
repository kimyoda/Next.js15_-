export default function ServerComponent() {
  if (typeof window === "undefined") {
    console.log("서버컴포넌트!");
  }
  return <div></div>;
}
