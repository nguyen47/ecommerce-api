const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlenght: 3,
        maxlenght: 255,
    },
    email: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('User', userSchema);