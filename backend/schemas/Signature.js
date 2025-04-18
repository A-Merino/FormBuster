const User = require('/User');
const mongoose = require('mongoose');

/*
    user: The User in the database
    signatureDate: The Date the signature is signed
    isSigned: String value to tell if form is signed by user
        - 'signed': form is signed by user
        - 'unsigned': form has not been signed by user
        - 'rejected': form is rejected by user 
        - 'na': form has been rejected by other user and this user has not signed already
*/

const Signature = new mongoose.Schema({
    user: {type:User, required:true},
    signatureDate: {type:Date, required:false},
    isSigned: {type:String, required:false, default:'unsigned'}
})

module.exports = mongoose.model('Signature', Signature);