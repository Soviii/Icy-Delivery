import React, { useState } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import TicketConfirmation from './TicketConfirmation';
import Axios from 'axios';

const CreateTicket = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const navigate = useNavigate();



  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await Axios.post('http://localhost:4000/tickets/createTicket', {
        customerID: localStorage.currentUserID,
        title: title,
        description: description,
        status: "Pending",
      });
      setShowConfirmation(true);
      console.log("finished creating ticket");
    } catch (error) {
      console.error(error);
    }
  };

  const handleConfirmationClose = () => {
    setShowConfirmation(false);
    navigate('/troubletickets');
    window.location.reload(); // force a page refresh
  };

  const isDisabled = title === '' || description === '';

  return (
    <div style={{ marginTop: "3rem" }}>
      <h2 style={{ margin: '0 auto', textAlign: 'center' }}>Create New Ticket</h2>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridName">
            <Form.Label>Title</Form.Label>
            
            <Form.Control type="text" placeholder="Enter name" value={title} onChange={(e) => setTitle(e.target.value)} style={{ width: "400px" }} />
          </Form.Group>
        </Row>

        <Form.Group className="mb-3" controlId="formGridDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" rows={3} placeholder="Enter description" value={description} onChange={(e) => setDescription(e.target.value)} style={{ width: "500px" }} />
        </Form.Group>

        <Button variant="primary" type="submit" disabled={isDisabled} style={{ marginBottom: "100px"}}>
          Submit
        </Button>
      </Form>
      {showConfirmation && <TicketConfirmation title={title} description={description} onClose={handleConfirmationClose} />}
    </div>
  );
};

export default CreateTicket;
