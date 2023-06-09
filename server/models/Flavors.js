const mongoose = require("mongoose");

const FlavorSchema = new mongoose.Schema({
    name: { type: String, required: true},
    quantity: { type: Number, required: true },
    description: {type: String, required: true },
    imageURL: { type: String, required: true },
    price: { type: Number, required: true, default: 30}
});

const FlavorModel = mongoose.model("flavors", FlavorSchema);

module.exports = FlavorModel;