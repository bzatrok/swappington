// imageProcessingService.ts
import cloudflareClient from "@/storage/cloudflareClient";
import cv from "@techstark/opencv-js";
import Jimp from "jimp";
import path from "path";

class ImageProcessingService {
    public async processImage(image: PictureRecord) {
        // Download the image from Cloudflare R2 to the local filesystem
        const imagePath = await cloudflareClient.downloadImage(image);

        // Read the image using Jimp
        const jimpSrc = await Jimp.read(imagePath);
        const imgData = {
            data: jimpSrc.bitmap.data,
            width: jimpSrc.bitmap.width,
            height: jimpSrc.bitmap.height,
            channels: 4 // RGBA
        };

        const imgMatrix = cv.matFromImageData(imgData);
        const ksize = new cv.Size(15, 15);
        const imgBlurred = new cv.Mat();
        cv.GaussianBlur(imgMatrix, imgBlurred, ksize, 30);

        const buffer = Buffer.from(imgBlurred.data);
        const processedImage = new Jimp({
            width: imgBlurred.cols,
            height: imgBlurred.rows,
            data: buffer
        });

        const processedImagePath = path.join(path.dirname(imagePath), `processed_${path.basename(imagePath)}`);
        await processedImage.writeAsync(processedImagePath);

        imgMatrix.delete();
        imgBlurred.delete();

        const processedImageUrl = await cloudflareClient.uploadPicture(image.name + "_processed", processedImagePath);

        image.url = processedImageUrl;
        // image.processedImageUrl = processedImageUrl;
        return image;
    }

    public async processImages(images: PictureRecord[]) {
        const processedImages = images.map(image => {
            return this.processImage(image);
        });
        return await Promise.all(processedImages);
    }
}

const imageProcessingService = new ImageProcessingService();
export default imageProcessingService;