const mongoose = require('mongoose');
const User = require('/User');

const CurrentForm = new mongoose.Schema({
    id: {type:Number, required:true},
    status: {type:[String], required:true},
    comments: {type:[String], required:false},
    users: {type:[User], required:true},
    creationDate: {type:Date, required:true},
    signatureDates: {type:[Date], required:false},
});

module.exports = mongoose.model('CurrentForm', CurrentForm);