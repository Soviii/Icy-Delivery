const express = require("express");
const ticketsRouter = express.Router();
const TicketModel = require("../models/Tickets");

const { CheckIfAccountExist } = require("./usersRouter")

//! Ticket System API Calls
/*
    retrieves all tickets 
    EX: http://localhost:4000/tickets/getAllTickets
*/
ticketsRouter.get("/getAllTickets", async (req, res) => {
    try {
        const tickets = await TicketModel.find();

        return res.status(200).send({
            success: true,
            data: tickets
        });
    } catch (err) {
        res.status(500).send({
            success: false,
            error: err.message
        });
    }
});



/*
    creates a ticket with given information from body
    EX: http://localhost:4000/tickets/createTicket
        > must include body
*/
ticketsRouter.post("/createTicket", async (req, res) => {
    try {
        const ticketInfo = req.body;
        const newTicket = new TicketModel(ticketInfo);
        await newTicket.save();
        
        return res.status(200).send({
            success: true,
            data: ticketInfo
        });
    } catch (err) {
        return res.status(500).send({
            success: false,
            error: err.message
        });
    }
});



/*
    retrieves all tickets that are currently pending
    EX: http://localhost:4000/tickets/getAllPendingTickets
*/
ticketsRouter.get("/getAllPendingTickets", async (req, res) => {
    try {
        const pendingTickets = await TicketModel.find({ status: "Pending" });


        if (pendingTickets.length == 0){
            return res.status(404).send({
                success: false,
                message: "no pending tickets available"
            })
        }

        return res.status(200).send({
            success: true,
            data: pendingTickets
        })
    } catch (err) {
        return res.status(500).send({
            success: false,
            error: err.message
        })
    }
});



/*
    retrieves all tickets that are currently resolved
    EX: http://localhost:4000/tickets/getAllResolvedTickets
*/
ticketsRouter.get("/getAllResolvedTickets", async (req, res) => {
    try {
        const resolvedTickets = await TicketModel.find({ status: "Resolved" });


        if (resolvedTickets.length == 0){
            return res.status(404).send({
                success: false,
                message: "no resolved tickets available"
            })
        }

        return res.status(200).send({
            success: true,
            data: resolvedTickets
        })
    } catch (err) {
        return res.status(500).send({
            success: false,
            error: err.message
        })
    }
});


/*
    retrieves all tickets that are under evaluation
    EX: http://localhost:4000/tickets/getAllUnderEvaluationTickets
*/
ticketsRouter.get("/getAllUnderReviewTickets", async (req, res) => {
    try {
        const underEvalTickets = await TicketModel.find({ status: "Under Review" });


        if (underEvalTickets.length == 0){
            return res.status(404).send({
                success: false,
                message: `no "under evaluation" tickets available`
            });
        }

        return res.status(200).send({
            success: true,
            data: underEvalTickets
        });
    } catch (err) {
        return res.status(500).send({
            success: false,
            error: err.message
        })
    }
});



/*
    retrieves all tickets that are currently resolved
    EX: http://localhost:4000/tickets/getAllRTicketsByCustomerID?customerID=<customer ID>
*/
ticketsRouter.get("/getAllPendingTicketsByCustomerID", async (req, res) => {
    try {
        const mongoose = require("mongoose");

        if (!mongoose.Types.ObjectId.isValid(req.query.customerID)){
            return res.status(400).send({
                success: false,
                message: "invalid customer ID"
            })
        }

        const customerExists = await CheckIfAccountExist({ id: req.query.customerID });
        if (!customerExists){
            return res.status(404).send({
                success: false,
                message: "invalid customer ID"
            })
        }

        const pendingTickets = await TicketModel.find({ 
            status: "Pending",
            customerID: req.query.customerID
        });

        if (pendingTickets.length == 0){
            return res.status(404).send({
                success: false,
                message: "no pending tickets available for customer"
            })
        }

        return res.status(200).send({
            success: true,
            data: pendingTickets
        })
    } catch (err) {
        return res.status(500).send({
            success: false,
            error: err.message
        })
    }
});






/*
    retrieves all tickets that are currently pending
    EX: http://localhost:4000/tickets/getAllPendingTicketsByCustomerID?customerID=<customer ID>
*/
ticketsRouter.get("/getAllResolvedTicketsByCustomerID", async (req, res) => {
    try {
        const mongoose = require("mongoose");

        if (!mongoose.Types.ObjectId.isValid(req.query.customerID)){
            return res.status(400).send({
                success: false,
                message: "invalid customer ID"
            })
        }

        const customerExists = await CheckIfAccountExist({ id: req.query.customerID });
        if (!customerExists){
            return res.status(404).send({
                success: false,
                message: "invalid customer ID"
            });
        }

        const resolvedTickets = await TicketModel.find({ 
            status: "Resolved",
            customerID: req.query.customerID
        });

        if (resolvedTickets.length == 0){
            return res.status(404).send({
                success: false,
                message: "no resolved tickets available for customer"
            })
        }

        return res.status(200).send({
            success: true,
            data: resolvedTickets
        })
    } catch (err) {
        return res.status(500).send({
            success: false,
            error: err.message
        })
    }
});




/*
    retrieves all tickets that are currently pending
    EX: http://localhost:4000/tickets/getAllUnderReviewTicketsByCustomerID?customerID=<customer ID>
*/
ticketsRouter.get("/getAllUnderReviewTicketsByCustomerID", async (req, res) => {
    try {

        const mongoose = require("mongoose");

        if (!mongoose.Types.ObjectId.isValid(req.query.customerID)){
            return res.status(400).send({
                success: false,
                message: "invalid customer ID"
            })
        }

        const customerExists = await CheckIfAccountExist({ id: req.query.customerID });
        if (!customerExists){
            return res.status(404).send({
                success: false,
                message: "invalid customer ID"
            });
        }

        const resolvedTickets = await TicketModel.find({ 
            status: "Under Review",
            customerID: req.query.customerID
        });

        if (resolvedTickets.length == 0){
            return res.status(404).send({
                success: false,
                message: `no under review tickets available for customer`
            })
        }

        return res.status(200).send({
            success: true,
            data: resolvedTickets
        })
    } catch (err) {
        return res.status(500).send({
            success: false,
            error: err.message
        })
    }
});




/*
    updates ticketstatus to whatever is passed in
        > must be "Resolved", "Under Evaluation", or "Pending"

    EX: http://localhost:4000/tickets/updateTicketStatus?ticketID=<ticket ID>&status=<status>
*/
ticketsRouter.patch("/updateTicketStatus", async (req, res) => {
    try { 
        const mongoose = require("mongoose");
        if (!mongoose.Types.ObjectId.isValid(req.query.ticketID)){
            return res.status(400).send({
                success: false,
                message: "ticket ID not valid length (recheck ID entered)"
            });
        }

        const ticketID = new mongoose.Types.ObjectId(req.query.ticketID);
        const newInfo = req.body;
        const ticket = await TicketModel.findById(
            ticketID,
            );
        
        if (!ticket){
            return res.status(404).send({
                success: false,
                message: "ticket ID not found"
            });
        }

        const newStatus = req.query.status;
        if(newStatus != "Resolved" && newStatus != "Under Review" && newStatus != "Pending"){
            return res.status(400).send({
                success: false,
                message: "status is not one of the following: Under Review, Resolved, Pending"
            })
        }
        
        ticket.status = newStatus;
        await ticket.save();

        return res.status(200).send({
            success: true,
            data: ticket
        });
    } catch (err) {
        return res.status(500).send({
            success: false,
            error: err.message
        })
    }
});




/*
    deletes ticket using ticket ID
    EX: http://localhost:4000/tickets/deleteTicketByTicketID?ticketID=<ticket ID>
        > must be valid ticket ID
*/
ticketsRouter.delete("/deleteTicketByTicketID", async (req, res) => {
    try { 
        const mongoose = require("mongoose");
        if (!mongoose.Types.ObjectId.isValid(req.query.ticketID)){
            return res.status(400).send({
                success: false,
                message: "ticket ID not valid length (recheck ID entered)"
            });
        }

        const ticketID = new mongoose.Types.ObjectId(req.query.ticketID);
        const newInfo = req.query.ticketID;
        let ticket = await TicketModel.findByIdAndDelete(ticketID);
        
        if (!ticket){
            return res.status(404).send({
                success: false,
                message: "ticket ID not found"
            });
        }

        return res.status(200).send({
            success: true,
            message: `ticket ${newInfo}`
        })

        

    } catch (err) {
        return res.status(500).send({
            success: false,
            error: err.message
        })
    }
})



module.exports = {
    ticketsRouter,
};