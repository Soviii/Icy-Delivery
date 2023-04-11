const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true  },
    email: {
        type: String,
        required: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
        unique: true
      },
    password: { type: String, required: true },
    address: {
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        zip: { type: String, required: true },
        country: { type: String, required: true }
      }
});

const UserModel = mongoose.model("users", UserSchema); // name of collection, name of model/schema

module.exports = UserModel;