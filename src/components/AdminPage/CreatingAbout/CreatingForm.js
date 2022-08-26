import React, { useEffect, useState } from "react";
import { Col, Row, Card, Form, Button } from "@themesberg/react-bootstrap";
import { client, getAbout } from "../../../service/baseApi";
import { useHistory } from "react-router-dom";

const CreatingForm = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [stepsDevplus, setStepsDevplus] = useState("");
  const [disableUpdate, setDisableUpdate] = useState(true);
  const [isValidTitle, setIsValidTitle] = useState(false);
  const [isValidDesc, setIsValidDesc] = useState(false);
  const [isValidStepsDevplus, setIsValidStepsDevplus] = useState(false);
  
  const history = useHistory();

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
    const res = await client.post(`/about`, dataAbout);
    history.push("/components/about");
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
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default CreatingForm;