// To connect with your mongoDB database
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config()

mongoose.connect('mongodb://127.0.0.1:27017/' + process.env.DB_NAME)
 
// Schema for users of app
const orderSchema = new mongoose.Schema({
    name: String,
    contact: String,
    email: String,
    date: String,
    status: String
});

// creating the model - think of it as a class
const Order = mongoose.model('orders', orderSchema);
 
// For backend and express
const express = require('express');
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("App is Working");
});
 
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

app.listen(5000, () => {
    console.log("Server is running at port 5000")
});