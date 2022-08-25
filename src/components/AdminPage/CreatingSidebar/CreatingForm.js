import React, { useState } from "react";
import { Col, Row, Card, Form, Button } from "@themesberg/react-bootstrap";
import ChoosePhoto from "../utils/ChoosePhoto";
import PhotoGallery from "../utils/PhotoGallery";
import { client } from "../../../service/baseApi";
import {
  uploadMultipleImages,
  uploadSingleImage,
} from "../../../service/uploadImage";
import { useHistory } from "react-router-dom";

const CreatingForm = () => {
  const [desc, setDesc] = useState("");
  const [socialIcon, setSocialIcon] = useState("");
  const [logoFile, setLogoFile] = useState(null);
  const [mapFile, setMapFile] = useState(null);
  const [logo, setLogo] = useState(
    "https://firebasestorage.googleapis.com/v0/b/devplus-admin.appspot.com/o/25logo-placeholder.png?alt=media&token=db37a0c6-9b95-49c0-965c-a0a6920c9e6e"
  );
  const [map, setMap] = useState(
    "https://firebasestorage.googleapis.com/v0/b/devplus-admin.appspot.com/o/25map-placeholder.jpg?alt=media&token=a441efac-d452-4655-b872-ec9e308d3a74"
  );
  const [galleryFile, setGalleryFile] = useState([]);
  const [gallery, setGallery] = useState([]);

  const history = useHistory();

  const handleChangeDesc = (e) => {
    setDesc(e.target.value);
  };

  const handleChangeSocial = (e) => {
    setSocialIcon(e.target.value);
  };

  const handleClickSave = async (e) => {
    e.preventDefault();

    let newSidebar = {
      desc: desc,
      logoImg: logo,
      gallery: gallery,
      mapImg: map,
      socialIcon: socialIcon,
    };

    if (logoFile) {
      const newLogo = await uploadSingleImage(logoFile);
      newSidebar = { ...newSidebar, logoImg: newLogo };
    }

    if (galleryFile) {
      const newGallery = await uploadMultipleImages(galleryFile);
      const oldGallery = gallery.slice(0, gallery.length - newGallery.length);
      console.log(oldGallery);
      newSidebar = {
        ...newSidebar,
        gallery: [...oldGallery, ...newGallery],
      };
    }

    if (mapFile) {
      const newMap = await uploadSingleImage(mapFile);
      newSidebar = { ...newSidebar, mapImg: newMap };
    }

    await client.post("/sidebar", newSidebar);
    history.push("/components/sidebar");
  };

  return (
    <Card border="light" className="bg-white shadow-sm mb-4">
      <Card.Body>
        <h5 className="mb-4">General information</h5>
        <Form>
          <Row>
            <Col md={12} className="mb-3">
              <Form.Group id="logo">
                <Form.Label>Logo</Form.Label>
                <ChoosePhoto
                  setFile={setLogoFile}
                  setImg={setLogo}
                  photo={logo}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={12} className="mb-3">
              <Form.Group id="desc">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="desc"
                  onChange={handleChangeDesc}
                  value={desc}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="align-items-center">
            <Col md={12} className="mb-3">
              <Form.Group id="gallery">
                <Form.Label>Image Gallery</Form.Label>
                <PhotoGallery
                  setFile={setGalleryFile}
                  setGallery={setGallery}
                  gallery={gallery}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={12} className="mb-3">
              <Form.Group id="map">
                <Form.Label>Map Image</Form.Label>
                <ChoosePhoto setFile={setMapFile} setImg={setMap} photo={map} />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={12} className="mb-3">
              <Form.Group id="social">
                <Form.Label>Social Icon</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="socialIcon"
                  onChange={handleChangeSocial}
                  value={socialIcon}
                />
              </Form.Group>
            </Col>
          </Row>
          <div className="mt-3 d-flex justify-content-between">
            <Button onClick={handleClickSave} variant="primary" type="submit">
              Upload
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default CreatingForm;
