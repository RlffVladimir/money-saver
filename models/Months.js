const mongoose = require('mongoose');
const {Schema} = mongoose;

const monthSchema = new Schema({
    name: String,
    year: String,
    data: Object
});

mongoose.model('months', monthSchema);