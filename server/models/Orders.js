const mongoose = require("mongoose");
const d = new Date();
const month = (d.getMonth() + 1).toString().padStart(2, "0");
const day = (d.getDate()).toString().padStart(2, "0");
const year = d.getFullYear();
const hours = d.getHours().toString().padStart(2, "0");
const minutes = d.getMinutes().toString().padStart(2, "0");

const orderDate = `${month}-${day}-${year} T${hours}:${minutes}`; //EX: "04-09-2023 T17:01"

const OrderSchema = new mongoose.Schema({
    customerID: { type: String, required: true },
    items: [{
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        cost: { type: Number, required: true }
    }],
    orderDate: { type: String, required: true, default: orderDate },
    shippingStatus: { type: String, default: "Pending", required: true },
    shippingDate: { type: String, required: true },
    /* shippingInfo can be different; can ship to another address but should still be in the same account */
    shippingInfo: {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        zip: { type: String, required: true },
        country: { type: String, required: true }
    }
});

const OrderModel = mongoose.model("orders", OrderSchema);

module.exports = OrderModel;