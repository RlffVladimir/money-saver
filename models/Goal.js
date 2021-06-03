const mongoose = require('mongoose');
const {Schema} = mongoose;

const GoalSchema = new Schema({
    goal: Number,
    date: {
        year: Number,
        month: Number
    },
    user: String
});

module.exports = mongoose.model('Goal', GoalSchema);