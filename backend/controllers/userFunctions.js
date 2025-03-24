// Import and Connect to mongodb
let mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/Senior_Design");

let db = mongoose.connection;

const us = db.collection('users');

const bcrypt = require('bcrypt');
const salts = 11;



exports.register = async (req, res) => {

    const User = require('./../schemas/User.js');
    const { id, firstName, lastName, email, password, role, major, advisor } = req.body;
    const existingUser = await User.findOne({ id });
    if (existingUser) {
        return res.status(400).json({ message: 'ID already registered.' });
    }
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
        await newUser.save();

        res.status(201).json({message: "Registration successful"});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error occurred", error: error.message });
    }
};
