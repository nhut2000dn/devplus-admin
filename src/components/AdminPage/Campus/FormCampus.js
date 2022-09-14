import React, { useEffect, useState } from "react";
import { Col, Row, Card, Form, Button } from "@themesberg/react-bootstrap";
import ChoosePhoto from "../utils/ChoosePhoto";
import { client, getCampus } from "../../../service/baseApi";
import { uploadSingleImage } from "../../../service/uploadImage";
import TableCampus from "./TableCampus";
import ModalDelete from "../utils/ModalDelete";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FormCampus = ({ setDisableAdd }) => {
  const [campus, setCampus] = useState([]);
  const [desc, setDesc] = useState("");
  const [id, setId] = useState("");
  const [image, setImage] = useState(
    "https://firebasestorage.googleapis.com/v0/b/devplus-admin.appspot.com/o/25logo-placeholder.png?alt=media&token=db37a0c6-9b95-49c0-965c-a0a6920c9e6e"
  );
  const [imageFile, setImageFile] = useState(null);
  const [imageUpLoadArray, setImageUploadArray] = useState([]);
  const [fileArray, setFileArray] = useState([]);
  const [imageArray, setImageArray] = useState([]);

  const [showDefault, setShowDefault] = useState(false);
  const [disableUpdate, setDisableUpdate] = useState(false);

  const handleClose = () => setShowDefault(false);

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
    if ( desc) {
      setCampus((prevState) => [
        ...prevState,
        { desc, img: image },
      ]);
     setDesc("");
      setImage(
        "https://firebasestorage.googleapis.com/v0/b/devplus-admin.appspot.com/o/25logo-placeholder.png?alt=media&token=db37a0c6-9b95-49c0-965c-a0a6920c9e6e"
      );
      setImageUploadArray((prevState) => [
        ...prevState,
        { index: campus.length - 1, file: imageFile },
      ]);
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

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getCampus();
      const campusData = data[0];
      if (campusData) {
        setCampus(campusData.items);
        setId(campusData._id);
        setDisableAdd(true);
      } else {
        setDisableUpdate(true);
      }
    };
    fetchData();
  }, [setDisableAdd]);

  const handleClickSave = async (e) => {
    e.preventDefault();
    const idToast = toast("Updating in progress, please wait", {autoClose: false })
    try {
      let updatedCampus = {
        campus,
      };
  
      const putData = async (id, objData) => {
        const res = await client.put(`/campus/${id}`, objData);
        setCampus(res.data.campus);
      };
  
      const changeData = async (fileArray) => {
        const promises = fileArray.map((arr) => {
          return new Promise((resolve, reject) => {
            uploadSingleImage(arr.file).then((img) =>
              resolve({ ...arr, img: img })
            );
          });
        });
  
        return Promise.all(promises).then((result) => result);
      };
  
      if (imageUpLoadArray) {
        const newUpload = await changeData(imageUpLoadArray);
        newUpload.forEach((updatedObj) => {
          updatedCampus.items[updatedObj.index].img = updatedObj.img;
        });
      }
  
      if (fileArray) {
        const newUpload = await changeData(fileArray);
        newUpload.forEach((updatedObj) => {
          const index = updatedCampus.items.findIndex(
            (obj) => obj._id === updatedObj._id
          );
          if (index > -1) {
            updatedCampus.items[index].img = updatedObj.img;
          }
        });
      }
      putData(id, updatedCampus);

      toast.update(idToast, { 
        type: "success",
        render: "Update success",
        autoClose: 2000,
      });
    } catch (error) {
      console.log(error)
      toast.update(idToast, { 
        type: "success",
        render: "Update success",
        autoClose: 2000,
      });
    }
  };

  const handleClickDelete = async () => {
    try {
      const idToast = toast("Deleting in progress, please wait", {autoClose: false })
      await client.delete(`/campus/${id}`);
      setCampus([]);
      setImage(
        "https://firebasestorage.googleapis.com/v0/b/devplus-admin.appspot.com/o/25logo-placeholder.png?alt=media&token=db37a0c6-9b95-49c0-965c-a0a6920c9e6e"
      );
      setShowDefault(false);
      setDisableUpdate(true);
      setDisableAdd(false);
      toast.update(idToast, { 
        type: "success",
        render: "Delete success",
        autoClose: 2000,
      });
    } catch (error) {
      console.log(error)
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
                <Form.Group id="desc">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    name="desc"
                    onChange={(e) => setDesc(e.target.value)}
                    value={desc}
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
                name="campus"
              />
            </div>
          </Form>
        </Card.Body>
        <ToastContainer position="top-center" />
      </Card>
    </>
  );
};

export default FormCampus;
