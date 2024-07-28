import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import fs from 'fs/promises';

class CloudflareClient {
    private s3Client: S3Client;

    constructor() {
        const accessKeyId = process.env["CLOUDFLARE_ACCESS_KEY_ID"] || '';
        const secretAccessKey = process.env["CLOUDFLARE_SECRET_ACCESS_KEY"] || '';
        const accountId = process.env["CLOUDFLARE_ACCOUNT_ID"] || '';

        this.s3Client = new S3Client({
            region: 'us-east-1', // ignored by cloudflare but needed for library
            endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
            credentials: {
                accessKeyId: accessKeyId,
                secretAccessKey: secretAccessKey
            }
        });
    }

    public async uploadPicture(name: string, filePath: string) {
        const bucketName = process.env["CLOUDFLARE_BUCKET_NAME"] || '';
        const fileContent = await fs.readFile(filePath);

        const putObjectCommand = new PutObjectCommand({
            Bucket: bucketName,
            Key: name,
            Body: fileContent 
        });

        await this.s3Client.send(putObjectCommand);
        return await this.generateSignedUrl(bucketName, name);
    }
            
    public async updateSignedUrlsIfNeeded(pictures: PictureRecord[]): Promise<PictureRecord[]> {
        const bucketName = process.env["CLOUDFLARE_BUCKET_NAME"] || '';
        const updatedPictures: PictureRecord[] = [];
    
        for (const picture of pictures) {
            const expirationTime = new Date(picture.urlExpiresAt);
            const currentTimePlus5Mins = new Date(Date.now() + 5 * 60 * 1000);
    
            if (expirationTime < currentTimePlus5Mins) {
                const url = await this.generateSignedUrl(bucketName, picture.name);
                const urlExpiresAt = new Date(Date.now() + 3600 * 1000);
                updatedPictures.push({ ...picture, url, urlExpiresAt });
            } else {
                updatedPictures.push(picture);
            }
        }
    
        return updatedPictures;
    }
    
    private async generateSignedUrl(bucketName: string, name: string) {
        const getObjectCommand = new GetObjectCommand({
            Bucket: bucketName,
            Key: name
        });

        const url = await getSignedUrl(this.s3Client, getObjectCommand, { expiresIn: 3600 });
        return url;
    }
}

const cloudflareClient = new CloudflareClient();
export default cloudflareClient;
