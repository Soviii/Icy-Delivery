import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useState } from 'react';
import { useEffect } from 'react';
import Axios from 'axios';


//TODO: try to use handleClose (don't think it's necessary)
const TroubleTicketDetails = ({ ticket, handleClose }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [status, setStatus] = useState("");

    const handleDelete = async () => {
        try {
            console.log("trying to delete ticket with id ", ticket._id);
            await Axios.delete(`http://localhost:4000/tickets/deleteTicketByTicketID?ticketID=${ticket._id}`);
            setTitle("Ticket has been deleted");
            setDescription("");
            setStatus("Status: Deleted");
            setTime("");
            setDate("");

            setTimeout(() => {
                window.location.reload(); // force a page refresh
                }, 2000);
            

        } catch (err) {
            console.log("ERROR: ", err.message);
        }
        
      }


    useEffect(() => {
        setTitle(ticket.title);
        setDescription(ticket.description);
        setDate("Date: " + ticket.date.slice(0,10));
        setTime("Time: " + ticket.date.slice(12,17));
        setStatus("Status: " + ticket.status);
    }, []);

  return (
    
    <Card style={{ width: '26rem', margin: '1.5rem' }}>
      <Card.Body>
        {ticket ? (
          <>
            <Card.Title className="text-center" style={{ fontSize: '2rem' }}>{title}</Card.Title>
            <Card.Text className="text-center">{description}</Card.Text>
            <Card.Text className="text-center" style={{ fontSize: '1rem', marginTop: '3rem', marginBottom: '0rem' }}>{date}</Card.Text>
            <Card.Text className="text-center" style={{ fontSize: '1rem' }}>{time}</Card.Text>
            <Card.Text className="text-center" style={{ marginTop: '3rem' }}>{status}</Card.Text>
            <Button variant="danger" className="mx-auto d-block" onClick={handleDelete}>
              Delete
            </Button>
          </>
        ) : (
          <div>No ticket found</div>
        )}
      </Card.Body>
    </Card>
  );
};

export default TroubleTicketDetails;
