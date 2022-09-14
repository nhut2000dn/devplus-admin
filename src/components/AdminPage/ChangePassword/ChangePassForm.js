import React, { useEffect, useState } from "react";
import { Col, Row, Card, Form, Button } from "@themesberg/react-bootstrap";
import { client, getAbout } from "../../../service/baseApi";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from "react-router-dom";
import Cookies from "universal-cookie";

const CreatingForm = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [disableUpdate, setDisableUpdate] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [isValidConfirmPassword, setIsValidConfirmPassword] = useState(false);

  const cookies = new Cookies();
  
  const history = useHistory();

  useEffect(() => {
    if (!password || !confirmPassword) {
        setDisableUpdate(true)     
      } else {
        setDisableUpdate(false) 
      }
    }, [password, confirmPassword])

  const handleChangepassword = (e) => {
    setPassword(e.target.value);
    e.target.value === "" ? setIsValidPassword(true) : setIsValidPassword(false)
    e.target.value != confirmPassword ? setIsValidConfirmPassword(true) : setIsValidConfirmPassword(false)
  };

  const handleChangeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
    e.target.value != password ? setIsValidConfirmPassword(true) : setIsValidConfirmPassword(false)
  };

  const handleClickSave = async (e) => {
    e.preventDefault();
    try {
      const id = toast("Change in progress, please wait", {autoClose: false })
      let dataChange = {
        password: password
      };
      const res = await client.put(`/user/changePass/${ cookies.get("id") }`, dataChange);
      toast.update(id, { 
        type: "success",
        render: "Change password success",
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
                <Form.Label>Password</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="password"
                  isInvalid={isValidPassword} 
                  onChange={handleChangepassword}
                  value={password}
                />
                <Form.Control.Feedback  type="invalid">Please fill the password input.</Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={12} className="mb-3">
              <Form.Group id="password">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="confirmPassword"
                  isInvalid={isValidConfirmPassword} 
                  onChange={handleChangeConfirmPassword}
                  value={confirmPassword}
                />
                <Form.Control.Feedback  type="invalid">The confirm password don't match password input.</Form.Control.Feedback>
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