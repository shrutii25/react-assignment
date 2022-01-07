import React, { useState } from "react";
import { Container, Modal } from "react-bootstrap";
import "../styles/posts.css";

const Zoom = (props) => {
  const [show, setShow] = useState(true);
  let { hideZoomed, image } = props;

  const handleClose = () => {
    setShow(false);
    hideZoomed();
  };

  return (
    <Container>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <img
            src={image}
            style={{ maxWidth: "80vw", maxHeight: "80vh", minWidth: "30vw" }}
          />
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Zoom;
