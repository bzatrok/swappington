// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import pictureModelClient from "@/database/pictureModelClient";
import imageProcessingService from "@/services/imageProcessingService";
import cloudflareClient from "@/storage/cloudflareClient";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PictureListResponse>,
) {
  const images = await pictureModelClient.getAllPictureModels();
  const updatedImages = await cloudflareClient.updateSignedUrlsIfNeeded(images);
  await pictureModelClient.updatePictureModels(updatedImages);

  // TEMP PROCESSING
  const processedImages = await imageProcessingService.processImages(updatedImages);
  // TEMP PROCESSING

  res.status(200).json({ pictures: processedImages });
}
