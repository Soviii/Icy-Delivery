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
  
  

  
  const tickets = [
    {
      id: 1,
      name: 'Slow Internet Speed',
      description: 'Internet is very slow',
      status: 'Resolved',
    },
    {
      id: 2,
      name: 'Connection Drops Frequently',
      description: 'My connection drops frequently',
      status: 'Under Evaluation',
    },
    {
      id: 3,
      name: 'No Internet Connection',
      description: 'I am unable to connect to the internet',
      status: 'Pending',
    },
    {
      id: 4,
      name: 'Email Not Working',
      description: 'I cannot send or receive emails',
      status: 'Under Evaluation',
    },
    {
      id: 5,
      name: 'Printer Not Working',
      description: 'My printer is not printing properly',
      status: 'Pending',
    },
    {
      id: 6,
      name: 'Computer Won\'t Start',
      description: 'My computer won\'t turn on',
      status: 'Resolved',
    },
    {
      id: 7,
      name: 'Software Installation Issues',
      description: 'I am having trouble installing software',
      status: 'Pending',
    },
    {
      id: 8,
      name: 'Security Concerns',
      description: 'I am concerned about the security of my device',
      status: 'Under Evaluation',
    },
  ];
  

  

  return (
    
    <div>
      <CreateTicket />
      <Row>
        <h2 style={{textAlign: 'center', padding: '20px'}}>Previous Tickets</h2>
      </Row>
      <Row>
        {usersTickets.map((ticket) => (
          <Col key={ticket.id}>
            <TroubleTicketCard ticket={ticket} />
          </Col>
        ))}
      </Row>
    </div>
  );
  
};

export default TroubleTickets;
