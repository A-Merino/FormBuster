// imports
const mongoose = require('mongoose');
const User = require('./User.js');
const Signature = require('./Signature.js');
const FormTemplate = require('./FormTemplate.js');
/*
    id: The id of the active form
    status: The status of the form, type should be of value:
        "Pending": Forms currently active and waiting to be completed
        "Rejected": Forms that have been rejected by some user
        "Paused": Forms that cannot be filled out but not deleted
        "Complete": Forms that are complete and do not need any more signatures
    comments: A list of comments from the different allowed users
    users: The list of users that have access to the form
    creationDate: Date and time it was created
    signatureDates: The dates that the form was signed 
*/

const CurrentForm = new mongoose.Schema({
    id: {type:String, required:true},
    formType: {type:String, required: true},
    formData: {type:Object, required:true},
    status: {type:String, required:true},
    comments: {type:[String], required:false},
    creationDate: {type:Date, required:true},
    signatures: {type:[String], required:false}

});

module.exports = mongoose.model('CurrentForm', CurrentForm);