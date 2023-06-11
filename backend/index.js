// To connect with your mongoDB database
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Order from "./Models/orders.js"
import express from 'express'
const app = express();
import cors from "cors"

// environment variables set up
dotenv.config()

// db connection - for localhost
// mongoose.connect(process.env.DB_CONNECTION_STRING + process.env.DB_NAME)

// db connection - using cluster
mongoose.connect(process.env.DB_CONNECTION_STRING)

app.use(express.json());
app.use(cors());

app.get("/api/", (req, res) => {
    res.send("App is Working");
});
 
// adds new orders
app.post("/api/add-order", async (req, res) => {
    try {
        const order = new Order(req.body);
        let result = await order.save();
        result = result.toObject();
        if (result) {
            res.send({msg: "Order added successfully!"});
        } else {
            res.send({msg: "There was an error trying to add the order, please try again."})
        }
    } catch (e) {
        res.send("Something Went Wrong. Please try again. " + e);
    }
});

app.get("/api/get-pending-orders", async (req, res) => {
    try {
        const response = await Order.find({ status: 'pending' });
        res.send(response)
    } catch(err) {
        console.log(err)
    }
})

app.post("/api/complete-order", async (req, res) => {
    try {
        await Order.updateOne(
            {"_id" : req.body.orderID},
            {$set: { "status" : "completed", "completedDate": req.body.completedDate}});
        res.status(200).send()
    } catch(e) {
        console.log(e)
        res.status(500).send(e)
    }
})

app.get("/api/get-completed-orders", async (req, res) => {
    try {
        const response = await Order.find({ status: 'completed' });
        res.send(response)
    } catch(err) {
        console.log(err)
    }
})

app.listen(process.env.PORT, () => {
    console.log("Server is running at port 5000")
});

export default app;