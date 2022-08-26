import React, { useEffect, useState } from "react";
import { Col, Row, Card, Form, Button } from "@themesberg/react-bootstrap";
import { client, getAbout } from "../../../service/baseApi";
import ModalDelete from "../utils/ModalDelete";

export const GeneralInfoForm = ({setDisable}) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [stepsDevplus, setStepsDevplus] = useState("");
  const [showDefault, setShowDefault] = useState(false);
  const [disableDelete, setDisableDelete] = useState(false);
  const [disableUpdate, setDisableUpdate] = useState(false);
  const [id, setId] = useState(null);
  const [isValidTitle, setIsValidTitle] = useState(false);
  const [isValidDesc, setIsValidDesc] = useState(false);
  const [isValidStepsDevplus, setIsValidStepsDevplus] = useState(false);

  const handleClose = () => setShowDefault(false);

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      const { data } = await getAbout();
      const about = data[0];
      if (about) {
        setDisable(true);
        setTitle(about.titleAbout);
        setDesc(about.descAbout);
        setStepsDevplus(about.itemsBoard.join('; '));
        setId(about._id);
      } else {
        setDisableUpdate(true);
        setDisableDelete(true);
      }
    };
    if (isMounted) fetchData();
    return () => { isMounted = false };
  }, []);

  useEffect(() => {
    if (!title || !desc || !stepsDevplus) {
        setDisableUpdate(true)     
      } else {
        setDisableUpdate(false) 
      }
    }, [title, desc, stepsDevplus])

  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
    e.target.value === "" ? setIsValidTitle(true) : setIsValidTitle(false)
  };

  const handleChangeDesc = (e) => {
    setDesc(e.target.value);
    e.target.value === "" ? setIsValidDesc(true) : setIsValidDesc(false)
  };

  const handleChangeStepDevplus = (e) => {
    setStepsDevplus(e.target.value);
    e.target.value === "" ? setIsValidStepsDevplus(true) : setIsValidStepsDevplus(false)
  };

  const handleClickSave = async (e) => {
    e.preventDefault();
    let dataAbout = {
      titleAbout: title,
      descAbout: desc,
      itemsBoard: stepsDevplus.split(';').map(item => item.trim()),
    };
    const res = await client.put(`/about/${id}`, dataAbout);
    setTitle(res.data.titleAbout);
    setDesc(res.data.descAbout);
    setStepsDevplus(res.data.itemsBoard.join('; '));
  };

  const handleClickDelete = async () => {
    await client.delete(`/about/${id}`);
    setTitle("");
    setDesc("");
    setStepsDevplus("");
    setShowDefault(false);
    setDisable(false);
    setDisableDelete(true);
  };

  return (
    <Card border="light" className="bg-white shadow-sm mb-4">
      <Card.Body>
        <h5 className="mb-4">General information</h5>
        <Form>
          <Row>
            <Col md={12} className="mb-3">
              <Form.Group id="desc">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="title"
                  disabled={disableDelete}
                  isInvalid={isValidTitle} 
                  onChange={handleChangeTitle}
                  value={title}
                />
                <Form.Control.Feedback  type="invalid">Please fill the title input.</Form.Control.Feedback>
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
                  as="textarea" 
                  rows="3"
                  name="desc"
                  disabled={disableDelete}
                  isInvalid={isValidDesc} 
                  onChange={handleChangeDesc}
                  value={desc}
                />
                <Form.Control.Feedback  type="invalid">Please fill the title input.</Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={12} className="mb-3">
              <Form.Group id="desc">
                <Form.Label>Road To Be A Devplus</Form.Label>
                <Form.Control
                  required
                  type="text"
                  as="textarea"
                  rows="1"
                  name="stepsDevplus"
                  disabled={disableDelete}
                  isInvalid={isValidStepsDevplus} 
                  onChange={handleChangeStepDevplus}
                  value={stepsDevplus}
                />
                <Form.Control.Feedback  type="invalid">Please fill the road steps input.</Form.Control.Feedback>
              </Form.Group>
              <div class="text-gray small">Items are divided by the character ;</div>
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
            <Button 
              variant="danger" 
              onClick={() => setShowDefault(true)}
              disabled={disableDelete}
            >
              Delete
            </Button>
            <ModalDelete
              showDefault={showDefault}
              handleDelete={handleClickDelete}
              handleClose={handleClose}
              name="about"
            />
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};