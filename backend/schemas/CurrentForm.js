const mongoose = require('mongoose');
const User = require('/User');
const Signature = require('/Signature');
const FormTemplate = require('/FormTemplate');
/*
    id: The id of the active form
    status: The status of the form, type should be of value:

    comments: A list of comments from the different allowed users
    users: The list of users that have access to the form
    creationDate: Date and time it was created
    signatureDates: The dates that the form was signed 
*/

const CurrentForm = new mongoose.Schema({
    id: {type:String, required:true},
    formType: {type:FormTemplate, required: true},
    formData: {type:Object, required:true},
    status: {type:String, required:true},
    comments: {type:[String], required:false},
    creationDate: {type:Date, required:true},
    signatures: {type:[Signature], required:false}

});

module.exports = mongoose.model('CurrentForm', CurrentForm);