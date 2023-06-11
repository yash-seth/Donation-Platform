import mongoose from 'mongoose'
let Schema = mongoose.Schema;
const orderSchema = new mongoose.Schema({
    name: String,
    contact: String,
    email: String,
    date: String,
    status: String,
    completedDate: String
});

let Order = mongoose.model('orders', orderSchema);

export default Order