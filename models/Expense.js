const mongoose = require('mongoose');
const {Schema} = mongoose;

const ExpenseSchema = new Schema({
    amount: {
        type: Number,
        require: true
    },
    productName: {
        type: String,
        require: true
    },
    date: {
        year: {
            type: Number,
            require: true
        },
        month: {
            type: Number,
            require: true
        },
        day: {
            type: Number,
            require: true
        }
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    purchaser: {
        type: Schema.Types.ObjectId,
        ref: 'Name',
    }
});

module.exports = mongoose.model('Expense', ExpenseSchema);