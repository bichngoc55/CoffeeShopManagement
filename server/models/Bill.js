const mongoose = require('mongoose');
 const { Schema } = mongoose;

const billSchema = new mongoose.Schema({
    customerName: {
        type: Schema.Types.ObjectId ,
        ref: 'Customer',
        required: true
    },
    items: [{
        name: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        }
    }],
   
    totalAmount: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    TableNo: {
        type: Number,
        required: true
    },
    Stuff: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    PhuThu : {
        type: Number,
        default: 0
    },
});

const Bill = mongoose.model('Bill', billSchema);

module.exports = Bill;