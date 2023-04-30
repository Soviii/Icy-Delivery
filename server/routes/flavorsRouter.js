const express = require("express");
const flavorsRouter = express.Router();
const FlavorModel = require("../models/Flavors");

//! Flavors API calls
/* 
    retrieves all flavors from database 
    http://localhost:4000/flavors/getFlavors
*/
flavorsRouter.get("/getFlavors", async(req, res) => {
    try {
        const flavors = await FlavorModel.find()
        return res.status(200).send({ data: flavors })
    } catch (err) {
        return res.status(400).send({ error: err })
    }
});

/* 
    adding a flavor to the flavors collection
    EX: http://localhost:4000/flavors/createFlavor
        > need body for input
*/
flavorsRouter.post("/createFlavor", async(req, res) => {
    try {
        const flavor = req.body;
        const newFlavor = new FlavorModel(flavor);
        await newFlavor.save();
        return res.status(200).send({ message: req.body })
    } catch (err) {
        return res.status(400).send({ data: err })
    }
})

/*
    deletes flavor
    EX: http://localhost:4000/flavors/deleteFlavor?name=<name>
*/
flavorsRouter.delete("/deleteFlavor", async(req, res) => {
    try {
        const flavorName = req.query.name;
        const flavorObject = await FlavorModel.findOne({ name: flavorName });
        if (!flavorObject){
            return res.status(404).send({
                success: false, 
                message: "Flavor not found"
            });
        }

        await FlavorModel.findByIdAndDelete(flavorObject.id);

        return res.status(200).send({
            success: true,
            message: `${flavorName} deleted!`
        });
    } catch (err) {
        res.status(500).send({
            success: false,
            message: "Internal server error"
        })
    }
});

/*
    update flavor details based on body given
    EX: http://localhost:4000/flavors/updateFlavorInfo?name=<name>
        > need body
        > no quotations for name input parameter
*/
flavorsRouter.patch("/updateFlavorInfo", async (req, res) => {
    try {
        const flavorName = req.query.name;
        const newInfo = req.body;
        const flavorObject = await FlavorModel.findOne({ name: flavorName });

        if (!flavorObject){
            return res.status(404).send({
                success: false, 
                message: "Flavor not found"
            });
        }

        const updatedFlavor = await FlavorModel.findByIdAndUpdate(
            flavorObject.id,
            newInfo,
            {new: true}
        );


        return res.status(200).send({
            success: true,
            message: `${flavorName} information updated!`,
            data: updatedFlavor
        });

    } catch (err) {
        return res.status(500).send({
            success: false,
            error: err.message
        });
    }
});

/*
    updates specific flavor inventory 
    EX: http://localhost:4000/flavors/updateFlavorInventory?name=<name>&quantity=<quantity>&operation=<add or null>
        > to add, must have operation=add
*/
flavorsRouter.patch("/updateFlavorInventory", async (req, res) => {
    try {
        const flavorName = req.query.name;
        const quantity = parseInt(req.query.quantity);
        let flavorObject = await FlavorModel.findOne({ name: flavorName });

        if (!flavorObject){
            return res.status(404).send({
                success: false, 
                message: "Flavor not found"
            });
        }

        if(req.query.operation == "add"){
            flavorObject.quantity = flavorObject.quantity + quantity;
        } else if(req.query.operation == "change") {
            flavorObject.quantity = quantity;
        } else{
            flavorObject.quantity = flavorObject.quantity - quantity;
        }

        const updatedFlavor = await FlavorModel.findByIdAndUpdate(
            flavorObject.id,
            flavorObject,
            {new: true}
        );

        return res.status(200).send({
            success: true,
            message: `inventory of ${flavorName} was ${req.query.operation == "add" ? "incremented" : "decremented"} by ${quantity}`,
            data: updatedFlavor
        });

    } catch (err) {
        return res.status(500).send({
            success: false,
            error: err.message
        });
    }
});

module.exports = {
    flavorsRouter,
};