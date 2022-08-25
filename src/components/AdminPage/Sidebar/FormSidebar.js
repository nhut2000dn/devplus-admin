import React, { useEffect, useState } from "react";
import { Col, Row, Card, Form, Button } from "@themesberg/react-bootstrap";
import ChoosePhoto from "./ChoosePhoto";
import PhotoGallery from "./PhotoGallery";
import { client, getSidebar } from "../../../service/baseApi";
import {
  uploadMultipleImages,
  uploadSingleImage,
} from "../../../service/uploadImage";

export const GeneralInfoForm = () => {
  const [desc, setDesc] = useState("");
  const [logoFile, setLogoFile] = useState(null);
  const [mapFile, setMapFile] = useState(null);
  const [map, setMap] = useState("");
  const [logo, setLogo] = useState("");
  const [galleryFile, setGalleryFile] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [id, setId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getSidebar();
      const sidebar = data[0];
      console.log(sidebar);
      setDesc(sidebar.desc);
      setLogo(sidebar.logoImg);
      setGallery([...sidebar.gallery]);
      setMap(sidebar.mapImg);
      setId(sidebar._id);
    };
    fetchData();
  }, []);

  const handleChangeDesc = (e) => {
    setDesc(e.target.value);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    logoFile && uploadSingleImage(logoFile, setLogo);
    galleryFile && uploadMultipleImages(galleryFile, setGallery);
    mapFile && setMap(uploadSingleImage(mapFile, setMap));

    const updatedSidebar = {
      desc: desc,
      logoImg: logo,
      gallery: gallery,
      mapImg: map,
    };

    const res = await client.put(`/sidebar/${id}`, updatedSidebar);
    setDesc(res.data.desc);
    setLogo(res.data.logoImg);
    setGallery([...res.data.gallery]);
    setMap(res.data.mapImg);
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
          <div className="mt-3">
            <Button onClick={handleClick} variant="primary" type="submit">
              Save All
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};
