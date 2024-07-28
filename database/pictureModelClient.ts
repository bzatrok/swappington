// pictureModelClient.ts

class PictureModelClient {
    public async getAllPictureModels() {
        return await prisma.pictureModel.findMany();
    }

    public async createPictureModel(name: string, url: string, urlExpiresAt: string) {
        return await prisma.pictureModel.create({
            data: {
                name,
                url,
                urlExpiresAt
            },
        });
    }

    public async updatePictureModels(pictures: PictureRecord[]) {
        const updatePromises = pictures.map(picture => {
            return prisma.pictureModel.update({
                where: { id: picture.id },
                data: {
                    url: picture.url,
                    urlExpiresAt: picture.urlExpiresAt
                }
            });
        });

        return await Promise.all(updatePromises);
    }
}

const pictureModelClient = new PictureModelClient();
export default pictureModelClient;