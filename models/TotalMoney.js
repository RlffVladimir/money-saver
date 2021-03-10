const mongoose = require('mongoose');

const totalMoneySchema = new mongoose.Schema({
    amount: Number
});

module.exports = mongoose.model('TotalMoney', totalMoneySchema);