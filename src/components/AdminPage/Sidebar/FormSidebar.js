import React, { useEffect, useState } from "react";
import { Col, Row, Card, Form, Button } from "@themesberg/react-bootstrap";
import ChoosePhoto from "../utils/ChoosePhoto";
import PhotoGallery from "../utils/PhotoGallery";
import { client, getSidebar } from "../../../service/baseApi";
import {
  uploadMultipleImages,
  uploadSingleImage,
} from "../../../service/uploadImage";
import ModalDelete from "../utils/ModalDelete";

const FormSidebar = ({ setDisableAdd }) => {
  const [desc, setDesc] = useState("");
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
  const [id, setId] = useState(null);
  const [showDefault, setShowDefault] = useState(false);
  const [disableUpdate, setDisableUpdate] = useState(false);

  const handleClose = () => setShowDefault(false);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getSidebar();
      const sidebar = data[0];
      if (sidebar) {
        setDesc(sidebar.desc);
        setLogo(sidebar.logoImg);
        setGallery([...sidebar.gallery]);
        setMap(sidebar.mapImg);
        setId(sidebar._id);
        setDisableAdd(true);
      } else {
        setDisableUpdate(true);
      }
    };
    fetchData();
  }, [setDisableAdd]);

  const handleChangeDesc = (e) => {
    setDesc(e.target.value);
  };

  const handleClickSave = async (e) => {
    e.preventDefault();

    let updatedSidebar = {
      desc: desc,
      logoImg: logo,
      gallery: gallery,
      mapImg: map,
    };

    if (logoFile) {
      const newLogo = await uploadSingleImage(logoFile);
      updatedSidebar = { ...updatedSidebar, logoImg: newLogo };
    }

    if (galleryFile) {
      const newGallery = await uploadMultipleImages(galleryFile);
      const oldGallery = gallery.slice(0, gallery.length - newGallery.length);
      console.log(oldGallery);
      updatedSidebar = {
        ...updatedSidebar,
        gallery: [...oldGallery, ...newGallery],
      };
    }

    if (mapFile) {
      const newMap = await uploadSingleImage(mapFile);
      updatedSidebar = { ...updatedSidebar, mapImg: newMap };
    }

    const res = await client.put(`/sidebar/${id}`, updatedSidebar);
    setDesc(res.data.desc);
    setLogo(res.data.logoImg);
    setGallery(res.data.gallery);
    setMap(res.data.mapImg);
  };

  const handleClickDelete = async () => {
    await client.delete(`/sidebar/${id}`);
    setDesc("");
    setLogo(
      "https://firebasestorage.googleapis.com/v0/b/devplus-admin.appspot.com/o/25logo-placeholder.png?alt=media&token=db37a0c6-9b95-49c0-965c-a0a6920c9e6e"
    );
    setGallery([]);
    setMap(
      "https://firebasestorage.googleapis.com/v0/b/devplus-admin.appspot.com/o/25map-placeholder.jpg?alt=media&token=a441efac-d452-4655-b872-ec9e308d3a74"
    );
    setShowDefault(false);
    setDisableUpdate(true);
    setDisableAdd(false);
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
          <div className="mt-3 d-flex justify-content-between">
            <Button
              onClick={handleClickSave}
              variant="primary"
              type="submit"
              disabled={disableUpdate}
            >
              Save All
            </Button>
            <Button variant="danger" onClick={() => setShowDefault(true)}>
              Delete
            </Button>
            <ModalDelete
              showDefault={showDefault}
              handleDelete={handleClickDelete}
              handleClose={handleClose}
              name="sidebar"
            />
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default FormSidebar;
