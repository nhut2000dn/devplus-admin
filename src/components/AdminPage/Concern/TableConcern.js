import React from "react";
import { Table, Button, Form } from "@themesberg/react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const TableConcern = ({ concerns, handleChange, handleDelete }) => {
  return (
    <Table hover className="user-table align-items-center">
      <thead className="thead-light">
        <tr>
          <th className="border-0 border-bottom">Question</th>
          <th className="border-0 border-bottom">Answer</th>
          <th className="border-0 border-bottom">Actions</th>
        </tr>
      </thead>
      <tbody>
        {concerns.map((concern, index) => (
          <tr key={index}>
            <td className="border-0 fw-bold">
              <Form.Group id="question">
                <Form.Control
                  required
                  as="textarea"
                  rows={3}
                  type="text"
                  name="question"
                  value={concern.question}
                  onChange={(event) => handleChange(event, concern._id)}
                />
              </Form.Group>
            </td>
            <td
              className="border-0 text-danger"
              style={{ whiteSpace: "normal" }}
            >
              <Form.Group id="answer">
                <Form.Control
                  required
                  as="textarea"
                  rows={3}
                  type="text"
                  name="answer"
                  value={concern.answer}
                  onChange={(event) => handleChange(event, concern._id)}
                />
              </Form.Group>
            </td>
            <td>
              <Button
                variant="light"
                size="sm"
                className="text-danger"
                onClick={() => handleDelete(concern._id)}
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

export default TableConcern;
