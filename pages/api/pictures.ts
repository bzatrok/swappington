// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<PictureListResponse>,
) {

  const images = [
    "face1.jpeg",
    "face2.jpeg",
    "face3.jpeg",
    "face4.jpeg",
    "face5.jpeg",
    "face6.jpeg"
  ]

  const imageResponsePlaceholder = images.map((image, index) => ({
    id: index,
    name: image,
    url: image,
    created_at: new Date().toISOString()
  }) as PictureRecord);

  res.status(200).json({ pictures: imageResponsePlaceholder });
}
