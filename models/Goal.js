const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
    goal: Number,
    date: {
        year: Number,
        month: Number
    }
});

module.exports = mongoose.model('Goal', goalSchema);