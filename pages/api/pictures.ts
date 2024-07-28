// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import pictureModelClient from "@/database/pictureModelClient";
import cloudflareClient from "@/storage/cloudflareClient";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PictureListResponse>,
) {
  const images = await pictureModelClient.getAllPictureModels();
  const updatedImages = await cloudflareClient.updateSignedUrlsIfNeeded(images);
  await pictureModelClient.updatePictureModels(updatedImages);
  res.status(200).json({ pictures: updatedImages });
}
