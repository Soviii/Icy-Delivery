const express = require("express");
const cors = require('cors');
const app = express();
const mongoose = require("mongoose");

app.use(cors({
    origin: "http://localhost:3000"
}));

const { usersRouter } = require("./routes/usersRouter");
const { ordersRouter } = require("./routes/ordersRouter");
const { ticketsRouter } = require("./routes/ticketsRouter");
const { flavorsRouter } = require("./routes/flavorsRouter");

app.use(express.json());
app.use('/users', usersRouter);
app.use('/orders', ordersRouter);
app.use('/flavors', flavorsRouter);
app.use('/tickets', ticketsRouter);


mongoose.connect('mongodb://localhost:27017/IcyDeliveryDatabase').then(() => console.log("connected to MongoDB")).catch((err) => console.error(err));

app.listen(4000, () => {
    console.log("server online!");
});




/* //TODO:
    !USERS
    > login 
    > forget password
    > delete account
    > update password/details
    > retrieve user ID
    * dont forget about salting and hashing passwords
    
    !Orders
    > add order
    > delete order
    > change order (only within 12 hours of creation)
    > update order (admin)

    !Flavors
    > create flavor
    > delete flavor
    > update flavor 

    !Ticket help system
    > create ticket
    > update ticket (admin)
    > delete ticket (only when user deletes account)
    > view tickets (for users)

*/