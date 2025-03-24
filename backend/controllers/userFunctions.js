// Import and Connect to mongodb
let mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/Senior_Design");

let db = mongoose.connection;

const us = db.collection('users');

// encryption stuff
const bcrypt = require('bcrypt');
const salts = 11;



exports.register = async (req, res) => {
    // get user model
    const User = require('./../schemas/User.js');
    // get information
    const { id, firstName, lastName, email, password, role, major, advisor } = req.body;
    // find if there is an existing user
    const existingUser = await User.findOne({ id });
    // if exists then error
    if (existingUser) {
        return res.status(400).json({ message: 'ID already registered.' });
    }
    // add content to User 
    try {
        const newUser = new User({
            id: id,
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            role: role,
            major: major,
            advisor: advisor,
        });
        // save user to database
        await newUser.save();

        res.status(201).json({message: "Registration successful"});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error occurred", error: error.message });
    }
};


exports.signIn = (req, res) => {
    // finds a matching email in the database
    let account = us.findOne({'email': req.body.email})
    .then(result => {
        // Compares the password given to the one stored
        bcrypt.compare(req.body.password, result.password, function (err, ress) {
            if (err) {
                console.log(err);
            } 

            if (ress) {
                req.session.user = result;
                res.json(result);
            } else {
                res.json({
                    message: "Incorrect Password"
                })

            }
        })


    })
}