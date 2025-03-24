let mongoose = require('mongoose');

// Need to change to name of database we agree on
mongoose.connect("mongodb://localhost:27017/Senior_Design");

let db = mongoose.connection;

const us = db.collection('users');
const bcrypt = require('bcrypt');
const salts = 11;


// Creates a user when the register button is pressed
exports.createUser = (req, res) => {

    let User = require('../schemas/User.js');

    // Creates new user model
    let newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        id: req.body.id,
        userType: req.body.type,
        major: req.body.major,
        advisor: req.body.advisor,
        emailNotifs: false,
        forms: []
    });


    newUser.save() // Saves to Database
        .then((record) => {
            // Return to static page to use
            res.json({
                message: 'Success',
                description: 'User information has successfully been saved.',
                user: record
            });
        })
        .catch(error => {
            res.json({
                message: 'Error',
                description: 'Could not save user information to the database. Sorry :(',
                user: null
        });
    });
}