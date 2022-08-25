import React, { useEffect, useState } from "react";
import { Col, Row, Card, Form, Button } from "@themesberg/react-bootstrap";
import ChoosePhoto from "../utils/ChoosePhoto";
import { client, getConcern } from "../../../service/baseApi";
import { uploadSingleImage } from "../../../service/uploadImage";
import TableConcern from "./TableConcern";
import ModalDelete from "../utils/ModalDelete";

const FormConcern = ({ setDisableAdd }) => {
  const [concerns, setConcerns] = useState([]);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [image, setImage] = useState(
    "https://firebasestorage.googleapis.com/v0/b/devplus-admin.appspot.com/o/25logo-placeholder.png?alt=media&token=db37a0c6-9b95-49c0-965c-a0a6920c9e6e"
  );
  const [videoId, setVideoId] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [id, setId] = useState("");

  const [showDefault, setShowDefault] = useState(false);
  const [disableUpdate, setDisableUpdate] = useState(false);

  const handleClose = () => setShowDefault(false);

  const handleChangeItemTable = (event, id) => {
    const { value, name } = event.target;
    setConcerns((prevState) =>
      prevState.map((concern) => {
        if (concern._id === id) {
          return { ...concern, [name]: value };
        }
        return concern;
      })
    );
  };

  const handleDeleteItemTable = (id) => {
    setConcerns((prevState) =>
      prevState.filter((concern) => concern._id !== id)
    );
  };

  const handleClickAdd = () => {
    setConcerns((prevState) => [...prevState, { question, answer }]);
    setQuestion("");
    setAnswer("");
  };

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getConcern();
      const concern = data[0];
      if (concern) {
        setConcerns(concern.concerns);
        setImage(concern.img);
        setVideoId(concern.video);
        setId(concern._id);
        setDisableAdd(true);
      } else {
        setDisableUpdate(true);
      }
    };
    fetchData();
  }, [setDisableAdd]);

  const handleClickSave = async (e) => {
    e.preventDefault();

    let updatedConcern = {
      concerns,
      img: image,
      video: videoId,
    };

    if (imageFile) {
      const newImage = await uploadSingleImage(imageFile);
      updatedConcern = { ...updatedConcern, img: newImage };
    }

    const res = await client.put(`/concern/${id}`, updatedConcern);
    setConcerns(res.data.concerns);
    setImage(res.data.img);
    setVideoId(res.data.video);
    console.log(res);
  };

  const handleClickDelete = async () => {
    await client.delete(`/concern/${id}`);
    setConcerns([]);
    setVideoId("");
    setImage(
      "https://firebasestorage.googleapis.com/v0/b/devplus-admin.appspot.com/o/25logo-placeholder.png?alt=media&token=db37a0c6-9b95-49c0-965c-a0a6920c9e6e"
    );
    setShowDefault(false);
    setDisableUpdate(true);
    setDisableAdd(false);
  };

  return (
    <>
      <Card
        border="light"
        className="bg-white shadow-sm mb-4 table-wrapper table-responsive shadow-sm"
      >
        <Card.Body>
          <h5 className="mb-4">Concern Content</h5>
          <TableConcern
            concerns={concerns}
            handleChange={handleChangeItemTable}
            handleDelete={handleDeleteItemTable}
          />
        </Card.Body>
      </Card>
      <Card
        border="light"
        className="bg-white shadow-sm mb-4 table-wrapper table-responsive shadow-sm"
      >
        <Card.Body>
          <h5 className="mb-4">Add more concern</h5>
          <Form>
            <Row>
              <Col md={12} className="mb-3">
                <Form.Group id="question">
                  <Form.Label>Question</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    name="question"
                    onChange={(e) => setQuestion(e.target.value)}
                    value={question}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={12} className="mb-3">
                <Form.Group id="answer">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    name="answer"
                    onChange={(e) => setAnswer(e.target.value)}
                    value={answer}
                  />
                </Form.Group>
              </Col>
            </Row>
            <div className="mt-3 d-flex justify-content-between">
              <Button onClick={handleClickAdd} variant="primary">
                Add
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
      <Card
        border="light"
        className="bg-white shadow-sm mb-4 table-wrapper table-responsive shadow-sm"
      >
        <Card.Body>
          <h5 className="mb-4">Upload Image and Video Id</h5>
          <Form>
            <Row>
              <Col md={12} className="mb-3">
                <Form.Group id="logo">
                  <Form.Label>Image</Form.Label>
                  <ChoosePhoto
                    setFile={setImageFile}
                    setImg={setImage}
                    photo={image}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={12} className="mb-3">
                <Form.Group id="videoId">
                  <Form.Label>Video Id</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    name="videoId"
                    onChange={(e) => setVideoId(e.target.value)}
                    value={videoId}
                  />
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
                name="concern"
              />
            </div>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
};

export default FormConcern;
