import React from "react";
import Resizer from "react-image-file-resizer";
import { BiCloudUpload } from "react-icons/bi";
import Imagecontainer from "./Imagecontainer";
const Fileuploader = ({ images, setImages }) => {
  const handleChange = async (e) => {
    const { files } = e.target;
    let imgs = [];
    for (let i = 0; i < files.length; i++) {
      await resizeFile(files[i]).then((uri) => {
        imgs.push(uri);
      });
    }
    e.target.value = "";
    setImages([...images, ...imgs]);
  };
  const resizeFile = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        700,
        700,
        "JPEG",
        100,
        0,
        (uri) => {
          resolve(uri);
        },
        "base64",
        700,
        700
      );
    });
  return (
    <div>
      <label className="btn btn-dark">
        <div style={{ fontSize: "1rem" }}>
          Upload
          <BiCloudUpload style={{ marginLeft: "5px", fontSize: "1.3rem" }} />
        </div>

        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleChange}
          hidden
        />
      </label>
      <Imagecontainer Imgs={images} setImages={setImages} />
    </div>
  );
};

export default Fileuploader;
