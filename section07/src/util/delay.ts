// 일부러 느리게 작동하게 하는 비동기 함수 세팅
export async function delay(ms: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("");
    }, ms);
  });
}
