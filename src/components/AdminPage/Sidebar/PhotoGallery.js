import React from "react";
import Img from "./Img";
import "./img.scss";

const PhotoGallery = ({ setFile, setGallery, gallery }) => {
  const handleChange = (e) => {
    const { files } = e.target;
    for (let i = 0; i < files.length; i++) {
      setFile((prevState) => [...prevState, files[i]]);
      setGallery((prevState) => [...prevState, URL.createObjectURL(files[i])]);
    }
  };

  return (
    <div className="d-xl-flex align-items-center flex-wrap">
      <div className="file-field cursor-pointer me-3 mb-3 image-button">
        <div className="d-flex">
          <span className="icon icon-md">+</span>
          <input type="file" multiple onChange={handleChange} />
        </div>
      </div>
      {gallery.map((image) => (
        <Img photo={image} key={image} />
      ))}
    </div>
  );
};

export default PhotoGallery;
