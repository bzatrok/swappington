import Layout from "@/components/Layout";
import { useEffect, useState } from "react";

const Home = function () {

  // Stateful variables
  const [images, setImages] = useState<PictureRecord[]>([])

  // useEffect hooks

  useEffect(() => {
    // This runs when the component mounts
    fetchAllImages();
  }, []);

  // Functions

  const fetchAllImages = async function () {
    const response = await fetch('/api/pictures');
    const data = await response.json();
    setImages(data.pictures);
  };

  const uploadImage = async function (file: File) {
    const formData = new FormData();
    formData.append('name', file.name);
    formData.append('file', file);

    const response = await fetch('/api/picture', {
      method: 'POST',
      body: formData,
    });
    const data = await response.json();
    setImages([...images, data.picture]);
  }

  // Event handlers
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file)
      uploadImage(file);
  };

  // JSX
  return (
    <Layout>
      {/* Top row with title & add picture button */}
      <div className="flex flex-col gap-8">
        <div className="flex flex-row justify-between">
          <div className="flex flex-col">
            <p>
              Tired of the boring backgrounds on your selfies?
            </p>
            <p>
              Drag & drop a picture in here and get a cool new one!
            </p>
          </div>
          <div>
            <label
              className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer"
            >
              Upload picture
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
              />
            </label>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {images.map((image, index) => (
            <div key={index} className="flex flex-col items-center">
              <img src={image.url} alt={"Random person" + index} className="rounded-lg" />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default Home;