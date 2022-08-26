import React from "react";
import { Image } from "@themesberg/react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperclip } from "@fortawesome/free-solid-svg-icons";

const ChooseTablePhoto = ({ setFileArray, id, setImageArray, photo }) => {
  const handleChange = (e) => {
    const { files } = e.target;
    setFileArray((prevState) => [...prevState, { _id: id, file: files[0] }]);
    setImageArray((prevState) => [
      ...prevState,
      { _id: id, img: URL.createObjectURL(files[0]) },
    ]);
  };

  return (
    <div className="d-xl-flex align-items-center">
      <div className="user-avatar xl-avatar">
        <Image fluid rounded src={photo} />
      </div>
      <div className="file-field cursor-pointer">
        <div className="d-flex justify-content-xl-center ms-xl-3">
          <div className="d-flex">
            <span className="icon icon-md">
              <FontAwesomeIcon icon={faPaperclip} className="me-3" />
            </span>
            <input type="file" onChange={handleChange} />
            <div className="d-md-block text-start">
              <div className="fw-normal text-dark mb-1">Choose Image</div>
              <div className="text-gray small">
                JPG, GIF or PNG. Max size of 800K
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChooseTablePhoto;
