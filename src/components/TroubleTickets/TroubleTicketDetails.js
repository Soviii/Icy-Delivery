// import React from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { Card, Button } from 'react-bootstrap';

// const TroubleTicketDetails = () => {
//   const location = useLocation();
//   const navigate = useNavigate();

//   // Check if the `ticket` property exists in the `location.state` object
//   const ticket = location.state?.ticket;

//   const handleDelete = () => {
//     // Implement delete functionality
//   };

//   const handleClose = () => {
//     // Implement close functionality
//   };

//   return (
//     <Card style={{ width: '18rem', margin: '1rem' }}>
//       <Card.Body>
//         {ticket ? (
//           <>
//             <Card.Title className="text-center">{ticket.title}</Card.Title>
//             <Card.Text className="text-center">{ticket.description}</Card.Text>
//             <Card.Text className="text-center">Date: {ticket.date}</Card.Text>
//             <Card.Text className="text-center">Status: {ticket.status}</Card.Text>
//             <Button variant="danger" className="mx-auto d-block" onClick={handleDelete}>
//               Delete
//             </Button>
//             <Button variant="primary" className="mx-auto d-block" onClick={handleClose}>
//               Close
//             </Button>
//           </>
//         ) : (
//           <div>No ticket found.</div>
//         )}
//       </Card.Body>
//     </Card>
//   );
// };

// export default TroubleTicketDetails;





import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useState } from 'react';
import { useEffect } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TroubleTicketDetails = ({ ticket, handleClose }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [status, setStatus] = useState("");
    const [deleted, setDeleted] = useState(false);
    // const navigate = useNavigate();

    const handleDelete = async () => {
        try {
            console.log("trying to delete ticket with id ", ticket._id);
            const response = await Axios.delete(`http://localhost:4000/tickets/deleteTicketByTicketID?ticketID=${ticket._id}`);
            setTitle("Ticket has been deleted");
            setDescription("");
            setStatus("Deleted");
            setDeleted(true);

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
        setDate(ticket.date);
        setStatus(ticket.status);
    }, []);

  return (
    
    <Card style={{ width: '26rem', margin: '1.5rem' }}>
      <Card.Body>
        {ticket ? (
          <>
            <Card.Title className="text-center">{title}</Card.Title>
            <Card.Text className="text-center">{description}</Card.Text>
            <Card.Text className="text-center">Date: {date}</Card.Text>
            <Card.Text className="text-center">Status: {status}</Card.Text>
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
