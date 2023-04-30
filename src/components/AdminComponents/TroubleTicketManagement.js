import React from 'react';
import { useState, useEffect } from 'react';
import Axios from 'axios'
import { Table, Form, Button, Modal } from 'react-bootstrap';
import e from 'cors';

const TroubleTicketManagement = () => {
  const [allTickets, setAllTickets] = useState([]);
  const [showOptionsModal, setShowOptionsModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState("");
  const [showAllButtonOptions, setShowAllButtonOptions] = useState(true);
  const [responseMessage, setResponseMessage] = useState("");

  const getAllTickets = async () => {
    try {
      setAllTickets([]);
      const pendingResponse = Axios.get(`http://localhost:4000/tickets/getAllPendingTickets`);
      const underReviewResponse = Axios.get(`http://localhost:4000/tickets/getAllUnderReviewTickets`);
      const resolvedResponse = Axios.get(`http://localhost:4000/tickets/getAllResolvedTickets`);

      const [pendingTickets, underReviewTickets, resolvedTickets] = await Promise.all([pendingResponse, underReviewResponse, resolvedResponse]); // Promise.all() used to wait for all the promises to resolve (waits for all API calls to finish)

      console.log(pendingTickets.data.data);
      console.log(underReviewTickets.data.data);
      console.log(resolvedTickets.data.data);

      const allTickets = [...pendingTickets.data.data, ...underReviewTickets.data.data, ...resolvedTickets.data.data];

      if (allTickets.length > 0) {
        setAllTickets(allTickets);
      }

    } catch (err) {
      console.log("Error in receiving tickets: ", err.message);
    }
  }

  useEffect(() => {
    getAllTickets();
  }, []);

  const handleViewOptions = (ticket) => {
    setSelectedTicket(ticket);
    setShowOptionsModal(true);
  };


  const handleDeletingTicket = async () => {
    try {
      const response = await Axios.delete(`http://localhost:4000/tickets/deleteTicketByTicketID?ticketID=${selectedTicket._id}`);
      setResponseMessage("Ticket has been deleted");
      getAllTickets();
    } catch (err) {
      setResponseMessage("Error in deleting");
    }

    setShowAllButtonOptions(false);
  }

  const handleUpdatingTicket = async (newStatus) => {
    try {
      const response = await Axios.patch(`http://localhost:4000/tickets/updateTicketStatus?ticketID=${selectedTicket._id}&status=${newStatus}`);
      setResponseMessage("Ticket has been updated to ", newStatus);
      getAllTickets();
    } catch (err) {
      setResponseMessage("Error in updating ticket status");
    }

    setShowAllButtonOptions(false);
  }

  return (
    <>
      <div>
        <Table striped bordered hover style={{ tableLayout: 'fixed' }}>
          <colgroup>
            <col style={{ width: '25%' }} />
            <col style={{ width: '25%' }} />
            <col style={{ width: '25%' }} />
            <col style={{ width: '25%' }} />
          </colgroup>
          <thead>
            <tr>
              <th>Ticket ID</th>
              <th>Ticket Title</th>
              <th>Ticket Status</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {allTickets.map((ticket, _) => (
              <tr key={_}>
                <td>{ticket._id}</td>
                <td>{ticket.title}</td>
                <td>{ticket.status}</td>
                <td>
                  <Button
                    variant="primary"
                    onClick={() => handleViewOptions(ticket)}>
                    View Options
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>




      {/* modal for view options */}
      <Modal show={showOptionsModal} onHide={() => {
        setShowOptionsModal(false);
        setTimeout(() => {
          setShowAllButtonOptions(true);
        }, 500)
      }}>
        <Modal.Header closeButton>
          <Modal.Title style={{ marginLeft: "98px" }}>Ticket Options and Details</Modal.Title>
        </Modal.Header>
        {showAllButtonOptions ? (
          <Modal.Body>
            <p style={{ marginBottom: "60px" }}>ID: {selectedTicket?._id}</p>
            <p>Date: {selectedTicket?.date ? selectedTicket?.date.slice(0, 10) : "NaN"}</p>
            <p>Title: {selectedTicket?.title}</p>
            <p style={{ marginBottom: "80px" }}>Description: {selectedTicket?.description}</p>
            <p>Status: {selectedTicket?.status}</p>
          </Modal.Body>
        ) : (
          <Modal.Body>
            <p>Ticket has been processed</p>
          </Modal.Body>
        )}





        <Modal.Footer>
          <Button variant="secondary" onClick={() => {
            setShowOptionsModal(false);
            setTimeout(() => {
              setShowAllButtonOptions(true);
            }, 500)
          }}>
            Close
          </Button>
          {showAllButtonOptions && <Button variant="warning" onClick={() => {
            handleUpdatingTicket("Pending");
          }}>
            Pending
          </Button>
          }


          {showAllButtonOptions && <Button variant="info" onClick={() => {
            handleUpdatingTicket("Under Review");
          }}>
            Under Review
          </Button>
          }

          {showAllButtonOptions && <Button variant="success" onClick={() => {
            handleUpdatingTicket("Resolved");
          }}>
            Resolved
          </Button>
          }

          {showAllButtonOptions &&
            <Button variant="danger" onClick={() => {
              handleDeletingTicket();
            }}>
              Delete
            </Button>
          }
        </Modal.Footer>
      </Modal>
    </>
  );

};

export default TroubleTicketManagement;
