import React from "react";
import { Col, Row, Container, Button } from "@themesberg/react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";
import CreatingForm from "./CreatingForm";

export default () => {
  const history = useHistory();

  return (
    <article>
      <Container className="px-0">
        <Row className="d-flex flex-wrap flex-md-nowrap align-items-center py-4">
          <Col className="d-block mb-4 mb-md-0">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
              <h1 className="h2">Creating Testimonial</h1>
              <Button
                onClick={() => history.push("/components/testimonial")}
                variant="secondary"
                className="text-dark me-2"
              >
                <FontAwesomeIcon icon={faArrowAltCircleLeft} className="me-2" />
                <span>Back</span>
              </Button>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <CreatingForm />
          </Col>
        </Row>
      </Container>
    </article>
  );
};
