import React from "react";
import { Table, Button, Form } from "@themesberg/react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import ChooseTablePhoto from "../utils/ChooseTablePhoto";

const TableTestimonial = ({
  setFileArray,
  setImageArray,
  testimonials,
  handleChange,
  handleDelete,
}) => {
  return (
    <Table hover className="user-table align-items-center">
      <thead className="thead-light">
        <tr>
          <th className="border-0 border-bottom">Avatar</th>
          <th className="border-0 border-bottom">Name</th>
          <th className="border-0 border-bottom">Title</th>
          <th className="border-0 border-bottom">Content</th>
          <th className="border-0 border-bottom">Action</th>
        </tr>
      </thead>
      <tbody>
        {testimonials &&
          testimonials.map((testimonial, index) => (
            <tr key={index}>
              <td
                className="border-0 text-danger"
                style={{ whiteSpace: "normal" }}
              >
                <Form.Group id="img">
                  <ChooseTablePhoto
                    setFileArray={setFileArray}
                    setImageArray={setImageArray}
                    id={testimonial._id}
                    photo={testimonial.img}
                  />
                </Form.Group>
              </td>
              <td className="border-0 fw-bold">
                <Form.Group id="name">
                  <Form.Control
                    required
                    as="textarea"
                    rows={3}
                    type="text"
                    name="name"
                    value={testimonial.name}
                    onChange={(event) => handleChange(event, testimonial._id)}
                  />
                </Form.Group>
              </td>
              <td className="border-0 text-danger">
                <Form.Group id="title">
                  <Form.Control
                    required
                    as="textarea"
                    rows={3}
                    type="text"
                    name="title"
                    value={testimonial.title}
                    onChange={(event) => handleChange(event, testimonial._id)}
                  />
                </Form.Group>
              </td>
              <td className="border-0 text-danger">
                <Form.Group id="content">
                  <Form.Control
                    required
                    as="textarea"
                    rows={3}
                    type="text"
                    name="content"
                    value={testimonial.content}
                    onChange={(event) => handleChange(event, testimonial._id)}
                  />
                </Form.Group>
              </td>
              <td>
                <Button
                  variant="light"
                  size="sm"
                  className="text-danger"
                  onClick={() => handleDelete(testimonial._id)}
                >
                  <FontAwesomeIcon icon={faTrashAlt} className="me-2" /> Remove
                </Button>
              </td>
            </tr>
          ))}
      </tbody>
    </Table>
  );
};

export default TableTestimonial;
