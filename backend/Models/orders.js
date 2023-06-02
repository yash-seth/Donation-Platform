const mongoose = require('mongoose'),
Schema = mongoose.Schema;
const orderSchema = new mongoose.Schema({
    name: String,
    contact: String,
    email: String,
    date: String,
    status: String,
    completedDate: String
});

module.exports = Order = mongoose.model('orders', orderSchema);