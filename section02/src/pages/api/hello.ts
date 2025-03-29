// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
// api/hello -> 해당하는 파일은 웹페이지가 아닌 api 응답을 정의하는 파일로 설정된다.
// api의 경로는 폴더구조에 맞게 경로를 갖게된다.
type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ name: "John Doe" });
}
