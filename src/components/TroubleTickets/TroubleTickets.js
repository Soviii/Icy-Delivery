import React from 'react';
import TroubleTicketCard from './TroubleTicketCard';
import CreateTicket from './CreateTicket';
import { Row, Col } from 'react-bootstrap';
import Axios from 'axios';
import { useState, useEffect } from 'react';

const TroubleTickets = () => {
  const [usersTickets, addTicket] = useState([]);



  useEffect(() => {
    const getAllOfUsersTickets = async () => {
      try {
        const pendingResponse = Axios.get(`http://localhost:4000/tickets/getAllPendingTicketsByCustomerID?customerID=${localStorage.currentUserID}`);
        const underReviewResponse = Axios.get(`http://localhost:4000/tickets/getAllUnderReviewTicketsByCustomerID?customerID=${localStorage.currentUserID}`);
        const resolvedResponse = Axios.get(`http://localhost:4000/tickets/getAllResolvedTicketsByCustomerID?customerID=${localStorage.currentUserID}`);
  
        const [pendingTickets, underReviewTickets, resolvedTickets] = await Promise.all([pendingResponse, underReviewResponse, resolvedResponse]); // Promise.all() used to wait for all the promises to resolve (waits for all API calls to finish)
        
        console.log(pendingTickets.data.data);
        console.log(underReviewTickets.data.data);
        console.log(resolvedTickets.data.data);
  
        const allTickets = [...pendingTickets.data.data, ...underReviewTickets.data.data, ...resolvedTickets.data.data];
  
        if (allTickets.length > 0) {
          addTicket(allTickets);
        }
  
      } catch (err) {
        console.log("Error in receiving tickets: ", err.message);
      }
  
      console.log(usersTickets.length);
    }
  
    getAllOfUsersTickets();
  }, []);
  

  return (
    
    <div>
      <CreateTicket />
      <Row>
        <h2 style={{textAlign: 'center', padding: '20px'}}>Previous Tickets</h2>
      </Row>
      <Row>
        {/* immediately invoked function expression (IIFE) */}
        {(() => {
          if (usersTickets.length === 0) {
            return <p>No tickets present</p>;
          } else {
            return usersTickets.map((ticket) => (
              <Col key={ticket.id}>
                <TroubleTicketCard ticket={ticket} />
              </Col>
            ));
          }
        })()}
      </Row>

    </div>
  );
  
};

export default TroubleTickets;
