const mongoose = require('mongoose');
const User = require('/User');
const Signature = require('/Signature');

/*
    id: The id of the active form
    status: The status of the form, type should be of value:

    comments: A list of comments from the different allowed users
    users: The list of users that have access to the form
    creationDate: Date and time it was created
    signatureDates: The dates that the form was signed 
*/

const CurrentForm = new mongoose.Schema({
    id: {type:Number, required:true},
    name: {type:String, required: true},
    status: {type:[String], required:true},
    comments: {type:[String], required:false},
    creationDate: {type:Date, required:true},
    signatures: {type:[Signature], required:false}

});

module.exports = mongoose.model('CurrentForm', CurrentForm);