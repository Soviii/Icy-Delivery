const mongoose = require("mongoose");
const d = new Date();
const month = (d.getMonth() + 1).toString().padStart(2, "0");
const day = (d.getDate()).toString().padStart(2, "0");
const year = d.getFullYear();
const hours = d.getHours().toString().padStart(2, "0");
const minutes = d.getMinutes().toString().padStart(2, "0");

const orderDate = `${month}-${day}-${year} T${hours}:${minutes}`; //EX: "04-09-2023 T17:01"

const TicketSchema = new mongoose.Schema({
    customerID: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, required: true },
    date: { type: String, default: orderDate }
});

const TicketModel = mongoose.model("tickets", TicketSchema);

module.exports = TicketModel;