import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal} from 'react-bootstrap';

export default function SuccessModal({
  show,
  handleClose,
  title,
  body,
  children}) {

  return (
    <>

      <Modal show={show} onHide={()=>handleClose()} centered>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{body}</Modal.Body>
        <Modal.Footer>
          {children}

        </Modal.Footer>
      </Modal>
    </>
  );
}