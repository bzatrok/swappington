import Layout from "@/components/Layout";

const Home = function () {

  // Static variables

  const images = [
    "face1.jpeg",
    "face2.jpeg",
    "face3.jpeg",
    "face4.jpeg",
    "face5.jpeg",
    "face6.jpeg"
  ]

  // Event handlers

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (file)
      alert("File uploaded: " + file?.name);
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
              <img src={image} alt={"Random person" + index} className="rounded-lg" />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default Home;