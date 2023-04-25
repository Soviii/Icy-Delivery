import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const TicketConfirmation = ({ title, description, onClose }) => {

  const navigate = useNavigate();


  return (
    <Modal show={true} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Ticket Confirmation</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Title: {title}</p>
        <p>Description: {description}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TicketConfirmation;
