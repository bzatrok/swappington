type PictureCreationRequest = {
    name: string;
    file: File;
};

type PictureRecord = {
    id: number;
    name: string;
    url: string;
    created_at: Date;
    urlExpiresAt: Date;
};

type PictureResponse = {
    picture: PictureRecord;
};

type PictureListResponse = {
    pictures: PictureRecord[];
};