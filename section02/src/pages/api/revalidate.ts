import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await res.revalidate("/");
    return res.json({ revalidated: true });
  } catch (err) {
    console.error("Revalidation error:", err); // 로그 출력으로 사용
    res.status(500).send("revalidation failed");
  }
}
