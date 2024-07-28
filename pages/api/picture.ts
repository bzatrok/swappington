// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import formidable from "formidable";
import type { NextApiRequest, NextApiResponse } from "next";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {

  if (req.method !== 'POST')
    return res.status(405).json({ message: "Method Not Allowed" });

  const form = formidable();

  form.parse(req, (err, fields, files) => {
    if (err)
      return res.status(500).json({ error: 'Error uploading file' });

    let file = null;
    let fileName = null;

    if (files && files.file) {
      file = files.file[0];
      console.log(file.filepath);
    } else {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    if (fields && fields['name']) {
      fileName = fields['name'][0];
      console.log(fileName);
    } else {
      return res.status(400).json({ error: 'No fields uploaded' });
    }

    const createdImageResponsePlaceholder: PictureRecord = {
      id: 1,
      name: fileName ?? 'No name',
      url: `/${file.filepath}`,
      created_at: new Date().toISOString(),
    };

    res.status(200).json({ picture: createdImageResponsePlaceholder } as PictureResponse);
  });
}
