const mongoose = require('mongoose');

const User = new mongoose.Schema({
    id: {type:Number, required:false},
    firstName: {type:String, required:true},
    lastName: {type:String, required:true},
    email: {type:String, required:true},
    password: {type:String, required:true},
    role: {type:String, required:false},
    major: {type:String, required:false},
    advisor: {type:Number, required:false},
    });

module.exports = mongoose.model('User', User);