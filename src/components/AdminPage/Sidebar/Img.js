import React from "react";
import { Image } from "@themesberg/react-bootstrap";
import "./img.scss";

const Img = ({ photo, onDelete }) => {
  return (
    <div className="user-avatar xl-avatar me-3 mb-3 position-relative">
      <Image fluid rounded src={photo} />
      <div className="button-wrapper">
        <button
          type="button"
          onClick={() => onDelete(photo)}
          className="btn-close btn-close-white"
          aria-label="Close"
        ></button>
      </div>
    </div>
  );
};

export default Img;
