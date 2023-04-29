const express = require("express");
const ordersRouter = express.Router();
const OrderModel = require("../models/Orders");

const { CheckIfAccountExist, RegexCheckForInputs } = require("./usersRouter.js");

// sovi: 643278558c71443e75df01d7
// arsh: 643350e213d84aba7948395e
// dante: 6433510e13d84aba79483961

//! Order API Calls

/*
    gets all orders of of all customers
    EX: http://localhost:4000/orders/getAllOrders
*/
ordersRouter.get("/getAllOrders", async (req, res) => {
    try{
        const orders = await OrderModel.find()
        return res.status(200).send({ data: orders })
    } catch (err) {
        return res.status(400).send({ error: err })
    }
});

/*
    gets all orders of customer ID
    EX: http://localhost:4000/orders/getOrdersByCustomerID?customerID=<customer ID>
*/
ordersRouter.get("/getOrdersByCustomerID", async (req, res) => {
    try {
        const customerID = req.query.customerID;
        const userExist = await CheckIfAccountExist({ id: customerID });

        if (!userExist){
            return res.status(404).send({
                success: false,
                message: `customer ID ${customerID} not found`,
                data: null
            });
        }

        const orders = await OrderModel.find({ customerID: customerID});

        if (orders.length > 0){
            return res.status(200).send({
                success: true,
                message: `orders for customer ${customerID}`,
                data: orders
            });
        } else {
            return res.status(404).send({
                success: false,
                message: `no orders found for customer ${customerID}`,
                data: null
            });
        }
    } catch (err) {
        return res.status(500).send({
            success: false,
            error: err.message
        });
    }
});



/*
    create order for user
    EX: http://localhost:4000/orders/createOrder
        > must pass in body (Order Schema)
        > don't need to pass in orderDate
*/
ordersRouter.post("/createOrder", async (req, res) => {
    try {
        const order = req.body;
        const newOrder = new OrderModel(order);
        await newOrder.save();
        return res.status(200).send({
            success: true,
            data: order
        })
    } catch (err) {
        return res.status(500).send({
            success: false,
            error: err.message
        });
    }
});


/*
    deletes all orders passed in by order ID
    EX: http://localhost:4000/orders/deleteOrderByOrderID?orderID=<order ID(s)>
        > can pass in multiple order IDs
*/
ordersRouter.delete("/deleteOrderByOrderID", async (req, res) => {
    try {
        const orders = [req.query.orderID];
        let success = await RemoveOrders(orders);
        if (!success){
            return res.status(400).send({
                success: false,
                message: "order removals failed; recheck order ID(s)"
            })
        }

        return res.status(200).send({
                success: true,
                message: "all order removed!"
        });
    } catch (err) {
        return res.status(500).send({
            success: false,
            error: err.message
        })
    }
});

/*
    update only the shipping status of the order without needed to pass any other info
    EX: http://localhost:4000/orders/updateOrderStatus?orderID=<order ID>&newStatus=<new status>
*/
ordersRouter.patch("/updateOrderStatus", async (req, res) => {
    try{
        const orderID = req.query.orderID;
        const newStatus = req.query.newStatus;
        const updatedOrder = await OrderModel.findByIdAndUpdate(
            orderID,
            {shippingStatus: newStatus},
            {new: true}
        );
        if (!updatedOrder) {
            return res.status(404).send({
                success: false,
                message: "Order not found"
            });
        }
        
        return res.status(200).send({
            success: true,
            message: "order updated!",
            data: updatedOrder
        });
    } catch (err) {
        return res.status(500).send({
            success: false,
            error: err.message
        })
    }
});

/*
    updates order 
    EX: http://localhost:4000/orders/updateOrder?orderID=<order ID>
        > need body (new info for order)
*/
ordersRouter.patch("/updateOrder", async (req, res) => {
    try {
        const orderID = req.query.orderID;
        let newInfo = req.body;
        
        const shippingInfo = {
            firstName: req.body.shippingInfo.firstName,
            lastName: req.body.shippingInfo.lastName,
            address: {
                street: req.body.shippingInfo.street,
                city: req.body.shippingInfo.city,
                state: req.body.shippingInfo.state,
                zip: req.body.shippingInfo.zip,
                country: req.body.shippingInfo.country
            }
        };

        const inputErrorFound = await RegexCheckForInputs(shippingInfo);
        if (inputErrorFound.success == false){
            return res.status(400).send({
                success: false,
                message: inputErrorFound.message
            });
        }

        for (let i = 0; i < req.body.items.length; i++){
            console.log(`items length: ${req.body.items.length}`)
            if (req.body.items[i].quantity <= 0){
                req.body.items.splice(i, 1);
                i -= 1;
            }
        }
        console.log(`final item length: ${req.body.items.length}`)


        const updatedOrder = await OrderModel.findByIdAndUpdate(
            orderID,
            newInfo,
            {new: true}
        );

        if (!updatedOrder) {
            return res.status(404).send({
                success: false,
                message: "Order not found"
            });
        }

        return res.status(200).send({
            success: true,
            message: "order updated!",
            data: updatedOrder
        })
    } catch (err) {
        return res.status(500).send({
            success: false,
            error: err.message
        })
    }
});


/* remove all orders in orders array */
    // separate function in case another API call function is created for deleting several orders (future TODO)
const RemoveOrders = async (orders) => {
    const mongoose = require("mongoose");
    let success = true;
    let successfulRemoval = [];

    /* saving success and orderID just in case i need to pass all the orders for frontend debugging */
    for(let i = 0; i < orders.length; i++){
        if(!mongoose.Types.ObjectId.isValid(orders[i])){
            successfulRemoval.push({
                success: false,
                orderID: orders[i]
            });
            success = false;
        } else {
            successfulRemoval.push({
                success: true,
                orderID: orders[i]
            });
        }
    }

    if (!success){
        return success;
    }

    for(let i = 0; i < orders.length; i++){
        if(successfulRemoval[i].success == true){
            await OrderModel.findByIdAndDelete(successfulRemoval[i].orderID);
        }
    }

    return success
};


module.exports = {
    ordersRouter,
};