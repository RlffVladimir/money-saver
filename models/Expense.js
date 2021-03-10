const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    amount: Number,
    category: String,
    date: {
        year: Number,
        month: String,
        day: Number
    }
});

module.exports = mongoose.model('Expense', expenseSchema);