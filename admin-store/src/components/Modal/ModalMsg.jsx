import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal} from 'react-bootstrap';


const ModalMsg = ({
  show,
  message,
  title,
  children,
  ...props}) => {
  return (
    <Modal show={show} centered>
        <Modal.Header>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{message}</Modal.Body>
        <Modal.Footer>
        {children}
        </Modal.Footer>
      </Modal>
  )
}

export default ModalMsg;
