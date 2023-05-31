// To connect with your mongoDB database
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Order = require("./Models/orders")
const express = require('express');
const app = express();
const cors = require("cors");

// environment variables set up
dotenv.config()

// db connection
mongoose.connect(process.env.DB_CONNECTION_STRING + process.env.DB_NAME)

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("App is Working");
});
 
// adds new orders
app.post("/add-order", async (req, res) => {
    try {
        console.log(req.body)
        const order = new Order(req.body);
        let result = await order.save();
        result = result.toObject();
        if (result) {
            res.send({msg: "Order added successfully!"});
            console.log(result);
        } else {
            res.send({msg: "There was an error trying to add the order, please try again."})
        }
    } catch (e) {
        res.send("Something Went Wrong. Please try again. " + e);
    }
});

app.listen(process.env.PORT, () => {
    console.log("Server is running at port 5000")
});