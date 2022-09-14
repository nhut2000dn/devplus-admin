import React, { useEffect, useState } from "react";
import { Col, Row, Card, Form, Button } from "@themesberg/react-bootstrap";
import { client, getAbout } from "../../../service/baseApi";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from "react-router-dom";

const CreatingForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [disableUpdate, setDisableUpdate] = useState(true);
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);
  
  const history = useHistory();

  useEffect(() => {
    if (!email || !password) {
        setDisableUpdate(true)     
      } else {
        setDisableUpdate(false) 
      }
    }, [email, password])

  const handleChangeemail = (e) => {
    setEmail(e.target.value);
    e.target.value === "" ? setIsValidEmail(true) : setIsValidEmail(false)
  };

  const handleChangepassword = (e) => {
    setPassword(e.target.value);
    e.target.value === "" ? setIsValidPassword(true) : setIsValidPassword(false)
  };

  const handleClickSave = async (e) => {
    e.preventDefault();
    try {
      const id = toast("Creating in progress, please wait", {autoClose: false })
      let dataAbout = {
        email: email,
        password: password,
        avatar: '',
      };
      const res = await client.post(`/user`, dataAbout);
      toast.update(id, { 
        type: "success",
        render: "Creating user success",
        autoClose: 2000,
        onClose: () => history.push("/users")
      });
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <Card border="light" className="bg-white shadow-sm mb-4">
      <Card.Body>
        <Form>
          <Row>
            <Col md={12} className="mb-3">
              <Form.Group id="password">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="email"
                  isInvalid={isValidEmail} 
                  onChange={handleChangeemail}
                  value={email}
                />
                <Form.Control.Feedback  type="invalid">Please fill the email input.</Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={12} className="mb-3">
              <Form.Group id="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  required
                  type="password"
                  name="password"
                  isInvalid={isValidPassword} 
                  onChange={handleChangepassword}
                  value={password}
                />
                <Form.Control.Feedback  type="invalid">Please fill the password input.</Form.Control.Feedback>
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
          </div>
        </Form>
      </Card.Body>
      <ToastContainer position="top-center" />
    </Card>
  );
};

export default CreatingForm;