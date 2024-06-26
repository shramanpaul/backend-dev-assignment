// models/Admin.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AdminSchema = new Schema({
    email: { 
        type: String,
        required: true,
        unique: true
    },
    username: { 
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('Admin', AdminSchema);
