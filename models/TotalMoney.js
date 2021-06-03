const mongoose = require('mongoose');
const {Schema} = mongoose;

const TotalMoneySchema = new Schema({
    amount: {
        type: Number,
        require: true
    },
    user: {
        type: String,
    },
});

module.exports = mongoose.model('TotalMoney', TotalMoneySchema);