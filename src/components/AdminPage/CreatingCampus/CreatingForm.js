import React, { useEffect, useState } from "react";
import { Col, Row, Card, Form, Button } from "@themesberg/react-bootstrap";
import ChoosePhoto from "../utils/ChoosePhoto";
import { client } from "../../../service/baseApi";
import { uploadSingleImage } from "../../../service/uploadImage";
import TableCampus from "../Campus/TableCampus";
import { useHistory } from "react-router-dom";

const CreatingForm = () => {
  const [campus, setCampus] = useState([]);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(
    "https://firebasestorage.googleapis.com/v0/b/devplus-admin.appspot.com/o/25logo-placeholder.png?alt=media&token=db37a0c6-9b95-49c0-965c-a0a6920c9e6e"
  );
  const [imageFile, setImageFile] = useState(null);

  const [fileArray, setFileArray] = useState([]);
  const [imageArray, setImageArray] = useState([]);

  const history = useHistory();

  const handleChangeItemTable = (event, id) => {
    const { value, name } = event.target;
    setCampus((prevState) =>
      prevState.map((campus) => {
        if (campus._id === id) {
          return { ...campus, [name]: value };
        }
        return campus;
      })
    );
  };

  const handleDeleteItemTable = (id) => {
    setCampus((prevState) =>
      prevState.filter((campus) => campus._id !== id)
    );
  };

  const handleClickAdd = () => {
    if ( title ) {
      setCampus((prevState) => [
        ...prevState,
        {  title,  img: image },
      ]);
      setTitle("");
      setImage(
        "https://firebasestorage.googleapis.com/v0/b/devplus-admin.appspot.com/o/25logo-placeholder.png?alt=media&token=db37a0c6-9b95-49c0-965c-a0a6920c9e6e"
      );
    }
  };

  useEffect(() => {
    setCampus((prevState) =>
      prevState.map((obj) => {
        const index = imageArray.findIndex((imgObj) => imgObj._id === obj._id);
        if (index > -1) {
          return { ...obj, img: imageArray[index].img };
        }
        return obj;
      })
    );
  }, [imageArray]);

  const handleClickSave = async (e) => {
    e.preventDefault();

    let updatedCampus = {
      campus,
    };

    const postData = async (objData) => {
      await client.post("/campus", objData);
      history.push("/components/campus");
    };

    if (imageFile) {
      const newImage = await uploadSingleImage(imageFile);
      updatedCampus.campuss[campus.length - 1].img = newImage;
    }

    if (fileArray) {
      (async function () {
        const promises = fileArray.map(async (file) => {
          const updateImage = await uploadSingleImage(file.file);
          return { img: updateImage, _id: file._id };
        });

        const promisesResult = await Promise.all(promises);

        promisesResult.forEach((updatedObj) => {
          const index = updatedCampus.campus.findIndex(
            (obj) => obj._id === updatedObj._id
          );
          if (index > -1) {
            updatedCampus.campus[index].img = updatedObj.img;
          }
        });
        postData(updatedCampus);
      })();
    } else {
      postData(updatedCampus);
    }
  };

  return (
    <>
      <Card
        border="light"
        className="bg-white shadow-sm mb-4 table-wrapper table-responsive shadow-sm"
      >
        <Card.Body>
          <h5 className="mb-4">Campus Content</h5>
          <TableCampus
            campus={campus}
            setFileArray={setFileArray}
            setImageArray={setImageArray}
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
          <h5 className="mb-4">Add more campus</h5>
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
                <Form.Group id="title">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    name="title"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
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
          <Form>
            <div className="mt-3 d-flex justify-content-between">
              <Button onClick={handleClickSave} variant="primary" type="submit">
                Upload
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
};

export default CreatingForm;
