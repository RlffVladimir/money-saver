const mongoose = require('mongoose');
const {Schema} = mongoose;

const NameSchema = new Schema ({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    name: {
        type: String,
        require: true
    },
    balance: {
        type: Number,
        default: 0
    },
    expenses: [{
        type: Schema.Types.ObjectId,
        ref: 'Expense'
    }]
})

const UserSchema = new Schema({
    username: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    names: [{type: Schema.Types.ObjectId, ref: 'Name'}]
});

module.exports.Name = mongoose.model('Name', NameSchema);
module.exports.User = mongoose.model('User', UserSchema);