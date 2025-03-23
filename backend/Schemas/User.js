const mongoose = require('mongoose');

const bcrypt = require('bcrypt');
const salts = 11;

const User = new mongoose.Schema({
    id: {type:Number, required:false},
    firstName: {type:String, required:true},
    lastName: {type:String, required:true},
    email: {type:String, required:true},
    password: {type:String, required:true},
    role: {type:String, required:false},
    major: {type:String, required:false},
    advisor: {type:Number, required:false},
    forms : [mongoose.Schema.Types.ObjectId]
    });


// turns the given password into a hashed passowrd
// before storing it in the database
UserSchema.pre('save', async function (callback){

    const salt = await bcrypt.genSalt(11);
    hpassword = await bcrypt.hash(this.password, salt);
    this.password = hpassword;

    callback();
});

module.exports = mongoose.model('User', User);