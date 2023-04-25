// import React from 'react';
// import { Card, Button } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';

// const TroubleTicketCard = ({ ticket }) => {
//   const navigate = useNavigate();

//   const handleViewDetails = () => {
//     navigate('/trouble-ticket-details', { state: { ticket: ticket} });
//   };

//   return (
//     <Card style={{ width: '18rem', margin: '1rem'}}>
//       <Card.Body>
//         <Card.Title className="text-center" style={{zIndex: -1}}>{ticket.name}</Card.Title>
//         <Card.Text className="text-center">{ticket.description.substring(0, 50) + '...'}</Card.Text>
//         <Card.Text className="text-center">{ticket.status.substring(0, 50)}</Card.Text>
//         <Button variant="primary" className="mx-auto d-block" onClick={handleViewDetails}>View Details</Button>
//       </Card.Body>
//     </Card>
//   );
// };

// export default TroubleTicketCard;





import React, { useState } from 'react';
import { Card, Button, Modal } from 'react-bootstrap';
import TroubleTicketDetails from './TroubleTicketDetails';

const TroubleTicketCard = ({ ticket }) => {
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const handleViewDetails = () => {
    setShowDetailsModal(true);
  };

  const handleCloseDetailsModal = () => {
    setShowDetailsModal(false);
  };



  return (
    <>
      <Card style={{ width: '18rem', margin: '1rem' }}>
        <Card.Body>
          <Card.Title className="text-center" style={{ zIndex: -1 }}>
            {ticket.name}
          </Card.Title>
          <Card.Text className="text-center">{ticket.title.substring(0, 50)}</Card.Text>
          <Card.Text className="text-center">{ticket.status.substring(0, 50)}</Card.Text>
          <Button variant="primary" className="mx-auto d-block" onClick={handleViewDetails}>
            View Details
          </Button>
        </Card.Body>
      </Card>

      <Modal show={showDetailsModal} onHide={handleCloseDetailsModal}>
        <Modal.Header closeButton>
          <Modal.Title>{ticket.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TroubleTicketDetails ticket={ticket} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDetailsModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default TroubleTicketCard;
