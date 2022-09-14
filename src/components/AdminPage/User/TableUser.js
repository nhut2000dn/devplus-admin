import React, { useEffect, useState } from "react";
import { Table, Button, Form, Image } from "@themesberg/react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faEdit } from "@fortawesome/free-solid-svg-icons";
import ModalDelete from "../utils/ModalDelete";

const TableConcern = ({ concerns, handleDelete, handleClickEdit }) => {

  const [id, setId] = useState("");
  const [showDefault, setShowDefault] = useState(false);
  const handleClose = () => setShowDefault(false);

  const handel = (id) => {
    console.log(id)
    setId(id)
    setShowDefault(true)
  }

  const handleDelete2 = () => {
    handleDelete(id);
    setShowDefault(false)
  }

  return (
    <Table hover className="user-table align-items-center">
      <thead className="thead-light">
        <tr>
          <th className="border-0 border-bottom">Email</th>
          <th className="border-0 border-bottom">Avatar</th>
          <th className="border-0 border-bottom" colSpan="2">Actions</th>
        </tr>
      </thead>
      <tbody>
        <ModalDelete
          showDefault={showDefault}
          handleDelete={handleDelete2}
          handleClose={handleClose}
          name="user"
        />
        {concerns.map((concern, index) => (
          <tr key={index}>
            <td className="border-0 fw-bold">
              { concern.email }
            </td>
            <td
              className="border-0 text-danger"
              style={{ whiteSpace: "normal" }}
            >
              <Form.Group id="avatar">
                <div className="user-avatar xl-avatar">
                  <Image width="50" fluid rounded src={ concern.avatar != "" ? concern.avatar : "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909__340.png" } />
                </div>
              </Form.Group>
            </td>
            <td>
              <Button
                variant="light"
                size="sm"
                className="text-danger"
                onClick={() => {
                  handel(concern._id)
                }}
              >
                <FontAwesomeIcon icon={faTrashAlt} className="me-2" /> Remove
              </Button>
            </td>
            <td>
              <Button
                variant="light"
                size="sm"
                className="text-primary"
                onClick={() => handleClickEdit(concern._id)}
              >
                <FontAwesomeIcon icon={faEdit} className="me-2" /> Edit
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default TableConcern;
