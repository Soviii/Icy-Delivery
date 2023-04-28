const express = require("express");
const usersRouter = express.Router();
const UserModel =  require("../models/Users");

//! User API Calls
/* 
    retrieves all users' information
    EX: http://localhost:4000/users/getAllUsers
*/
usersRouter.get("/getAllUsers", async (req, res) => {
    try {
        const users = await UserModel.find()
        return res.status(200).send({ data: users })
    } catch (err) {
        return res.status(400).send({ error: err })
    }
});

/* 
    creating a user in the users collection
    EX: http://localhost:4000/users/createUser
        > must have body passed in
*/
usersRouter.post("/createUser", async (req, res) => {
    try {
        if(await CheckIfAccountExist({email: req.body.email})){
            return res.status(400).send({ 
                success: false,
                error: "Account with email address already exists"
            });
        }
        let inputErrorFound = await RegexCheckForInputs(req.body);
        if (inputErrorFound.success == false){
            return res.status(400).send({
                success: false,
                error: inputErrorFound.message
            });
        }
        const user = req.body;
        const newUser = new UserModel(user);
        await newUser.save();
        return res.status(200).send({
            success: true,
            data: newUser
        })
    } catch (err) {
        mongoose = require("mongoose")
        if (err instanceof mongoose.Error.ValidationError) {
            return res.status(400).send({ 
                success: false,
                error: err.message
        });
        }   
        return res.status(500).send({
            success: false,
            error: "Internal Server Error"
        });

        // } else if (err.code === 11000) {
        //     return res.status(400).send({ 
        //         success: false,
        //         error: "Email address already exists"
        //     }); 
        // } else {
        //     return res.status(500).send({
        //         success: false,
        //         error: "Internal Server Error"
        //     });
        // }
    }
})



/* 
    verifies login credentials
    EX: http://localhost:4000/users/login?email=<email>&password=<password>
        > no quototation marks around input parameters
*/
usersRouter.get("/login", async (req, res) => {
    try {
        const email = req.query.email;
        const password = req.query.password;

        const user = await UserModel.findOne({ email });
        if (!user) { // meaning user does not exist
        return res.status(401).send({
            success: false,
            message: "Invalid email or password",
            data: null
        });
        } else if (password != user.password) {
            return res.status(401).send({ 
                success: false,
                message: "Invalid email or password",
                data: null
            });
      } else {
            return res.status(200).send({ 
                success: true,
                message: "Successfully logged in!",
                data: user
            });
      }
    //   const isMatch = await bcrypt.compare(password, user.password);
    //   if (!isMatch) {
    //     return res.status(401).send({ error: "Invalid email or password" });
    //   }
    } catch (err) {
        return res.status(500).send({ error: "Internal Server Error" });
    }
});
usersRouter.get("/getUser", async (req, res) => {
    try{
        const id = req.query.id;
        const user = await UserModel.findById(id);
        if(!user){
            return res.status(401).send({
                success: false,
                message: "Invalid id",
                data: null
            });
        } else{
            return res.status(200).send({
                success: true,
                message: "User Found",
                data: user
            });
        }

        } catch (err){
            return res.status(500).send({ error: "Internal Server Error" });
    }
});
/* 
    update user info by using id to find them
    EX: http://localhost:4000/users/updateUserInfo?id=<id> 
        > must have body as well
        > no quotation marks around id
*/
usersRouter.patch("/updateUserInfo", async (req, res) => { // patch request instead of put (patch is conventionally for replacing partial data while put is for complete overwrite)
    try {
        const userId = req.query.id;
        const newInfo = req.body;

        const validNewInfo = await RegexCheckForInputs(newInfo);

        if(validNewInfo.success === false){
            return res.status(400).send({
                success: false, 
                message: validNewInfo.message
            })
        }
        /* update user info */
        const updatedUser = await UserModel.findByIdAndUpdate(
            userId, 
            newInfo, 
            {new: true}
        );

        if (!updatedUser) {
            return res.status(404).send({
                success: false,
                message: "User not found",
            });
        }

        return res.status(200).send({
            success: true,
            message: "user updated!",
            data: updatedUser,
        });
    } catch (err) {
        return res.status(500).send({
            success: false,
            error: err.message,
        });
    }
});


/* 
    deletes user with their object ID 
    EX: http://localhost:4000/users/deleteUser?id=<id>
*/
usersRouter.delete("/deleteUser", async (req, res) => {
    try {
        const userID = req.query.id;
        const deletedUser = await UserModel.findByIdAndDelete(userID);
        if (!deletedUser) {
            return res.status(404).send({ 
                success: false,
                message: "User not found"
            });
        }
        return res.status(200).send({ 
            success: true,
            message: "User deleted successfully"
            });
    } catch (err) {
        res.status(500).send({ error: "Internal Server Error" });
    }
});

const CheckIfAccountExist = async (details) => {
    if (details.hasOwnProperty("email")){
        const user = await UserModel.findOne({ "email": details.email });
        if(!user){
            return false;
        }
        return true;
    } else if (details.hasOwnProperty("id")){
        const mongoose = require("mongoose");

        /* need to verify that details.id is of right length (12 bytes or 24 hex characters)*/
        if (!mongoose.Types.ObjectId.isValid(details.id)){
            return false;
        } 

        const newID = new mongoose.Types.ObjectId(details.id);
        const user = await UserModel.findById(newID);
        if(!user){
            return false;
        }
        return true;
    }
    
};

  
const RegexCheckForInputs = async (details) => {

    // used for validating input fields
    const nameRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    const zipRegex = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
    const streetRegex = /^[a-zA-Z0-9\s,'-.]*$/;
    const countryRegex = /^[a-zA-Z\s]+(?:[\s-][a-zA-Z\s]+)*$/;
    const dateOfBirthRegex = /^(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])-(19|20)\d{2}$/;
    
    /* regex stuff for validation; if any if statements are true, means input was not to standard*/
    if (details.firstName.length <= 0 || !nameRegex.test(details.firstName)) {
        return { 
            success: false, 
            message: "Invalid first name"
        };
    }

    if (details.lastName.length <= 0 || !nameRegex.test(details.lastName)) {
        return { 
            success: false, 
            message: "Invalid last name"
        };
    }

    if (details.email.length <= 0 || !emailRegex.test(details.email)) {
        return {
            success: false,
            message: "Invalid email"
        };
    }

    if (details.password.length <= 0 || !passwordRegex.test(details.password)) {
        return { 
            success: false, 
            message: "Invalid password\n\nMust follow these requirements:\nAt least one digit\nAt least one uppercase letter\nAt least one lowercase letter\nAt least 8 characters" 
        };
    }

    if (details.address.street.length <= 0 || !streetRegex.test(details.address.street)) {
        return { 
            success: false, 
            message: "Invalid street" 
        };
    }

    if (details.address.city.length <= 0 || !nameRegex.test(details.address.city)) {
        return { 
            success: false,
            message: "Invalid city"
        };
    }

    if (details.address.state.length <= 0 || !nameRegex.test(details.address.state)) {
        return { 
            success: false, 
            message: "Invalid state"
        };
    }

    if (details.address.zip.length <= 0 || !zipRegex.test(details.address.zip)) {
        return { 
            success: false, 
            message: "Invalid zip" 
        };
    }

    if (details.address.country.length <= 0 || !countryRegex.test(details.address.country)) {
        return {
            success: false,
            message: "Invalid country"
        };
    }

    if (details.dateOfBirth.length <= 0 || !dateOfBirthRegex.test(details.dateOfBirth)){
        return {
            success: false,
            message: "Invalid birthday"
        };
    }

    return {
        success: true,
        message: "success"
    }
};

module.exports = {
    usersRouter, 
    CheckIfAccountExist,
    RegexCheckForInputs
};