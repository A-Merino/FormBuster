// Import modules
const express = require("express");
const fs = require('fs');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const jsonParse = bodyParser.json();
const session = require('express-session');

const mongoose = require('mongoose');
const dbConnect = require('./config/db');
const User = require('./Schemas/User');
const FormTemplate = require('./schemas/FormTemplate');

const router = express.Router();

router.post("/forms/save", async (req, res) => {
    try {
        const { name, data } = req.body;
        const newForm = new FormTemplate({ name, data });
        await newForm.save();

        res.status(201).json({ msg: "Save successful" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error occurred", error: error.message });
    }
});

router.post("/users/register", async (req, res) => {
    const { id, firstName, lastName, email, password, role, major, advisor } = req.body;
    const existingUser = await User.findOne({ id });
    if (existingUser) {
        return res.status(400).json({ message: 'ID already registered.' });
    }
    try {
        const newUser = new User({
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
});

router.get("/getForms", async (req, res) => {
    try {
        const forms = await FormTemplate.find();
        res.status(200).json({ forms });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error occurred", error: error.message });
    }
});

module.exports = router;
dbConnect();

// Create app and set port
const app = express();

app.use(cors());
const port = 3000;

// create root to index.html
const root = path.join(__dirname, "client", "dist")

// create a session for cookies
app.use(session({
    secret:"verySecretSecret",
    resave: true,
    saveUninitialized: true,   
}))


// Set all the middleware and files that the app will use
app.use('/', express.static(root));
app.use(jsonParse);
app.use(bodyParser.urlencoded({extended: true}));
app.use("/api", router);


// Always send the static files from server
app.get("/*", (req, res) => {
    res.sendFile(path.join(root, "index.html"))
});


// When server is started, it is logged on console
app.listen(port, () => {
    console.log(`Server running on ${port}`);
});

