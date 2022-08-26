import React from "react";
import { Table, Button, Form } from "@themesberg/react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import ChooseTablePhoto from "../utils/ChooseTablePhoto";

const TableCampus = ({
  setFileArray,
  setImageArray,
  campus,
  handleChange,
  handleDelete,
}) => {
  return (
    <Table hover className="user-table align-items-center">
      <thead className="thead-light">
        <tr>
          <th className="border-0 border-bottom">Image</th>
          <th className="border-0 border-bottom">Title</th>
          <th className="border-0 border-bottom">Action</th>
        </tr>
      </thead>
      <tbody>
        {campus &&
          campus.map((campus, index) => (
            <tr key={index}>
              <td
                className="border-0 text-danger"
                style={{ whiteSpace: "normal" }}
              >
                <Form.Group id="img">
                  <ChooseTablePhoto
                    setFileArray={setFileArray}
                    setImageArray={setImageArray}
                    id={campus._id}
                    photo={campus.img}
                  />
                </Form.Group>
              </td>
              <td className="border-0 text-danger">
                <Form.Group id="desc">
                  <Form.Control 
                    required
                    as="textarea"
                    rows={3}
                    type="text"
                    name="desc"
                    value={campus.desc}
                    onChange={(event) => handleChange(event, campus._id)}
                  />
                </Form.Group>
              </td>
              <td>
                <Button
                  variant="light"
                  size="sm"
                  className="text-danger"
                  onClick={() => handleDelete(campus._id)}
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

export default TableCampus;
