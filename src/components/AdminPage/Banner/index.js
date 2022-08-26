import React, { useState } from "react";
import {
  Col,
  Row,
  Card,
  Form,
  Container,
  InputGroup,
  Button,
} from "@themesberg/react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { GeneralInfoForm } from "./FormBanner";
import { useHistory } from "react-router-dom";

const Banner = () => {
  const history = useHistory();
  const [disableNew, setDisableNew] = useState(false);

  return (
    <article>
      <Container className="px-0">
        <Row className="d-flex flex-wrap flex-md-nowrap align-items-center py-4">
          <Col className="d-block mb-4 mb-md-0">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
              <h1 className="h2">Banner</h1>
              <Button
                onClick={() => history.push("/components/creating-banner")}
                variant="secondary"
                className="text-dark me-2"
                disabled={disableNew}
              >
                <FontAwesomeIcon icon={faPlus} className="me-2" />
                <span>New</span>
              </Button>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <GeneralInfoForm setDisable={setDisableNew} />
          </Col>
        </Row>
      </Container>
    </article>
  );
};

export default Banner;