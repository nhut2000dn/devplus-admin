import React from "react";
import { Button, Modal } from "@themesberg/react-bootstrap";

const ModalDelete = ({ showDefault, handleDelete, handleClose, name }) => {
  return (
    <Modal as={Modal.Dialog} centered show={showDefault} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title className="h6">Delete existing {name}</Modal.Title>
        <Button variant="close" aria-label="Close" onClick={handleClose} />
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure to delete this section?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={handleDelete}>
          Delete
        </Button>
        <Button
          variant="link"
          className="text-gray ms-auto"
          onClick={handleClose}
        >
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalDelete;
