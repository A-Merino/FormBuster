// Import modules
const express = require("express");
const fs = require('fs');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const jsonParse = bodyParser.json();
const session = require('express-session');
const router = require("./api/routing.js");



const mongoose = require('mongoose');
const dbConnect = require('./config/db');
const FormTemplate = require('./schemas/FormTemplate');

const router = express.Router();






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
// json serialization and parsing!!!!
app.use(jsonParse);
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());


// IDK what this is but im leaving it for now
//<<<<<<< HEAD
//=======
//>>>>>>> a0719fddf54aa7056d21290b9bb353355d57b268


// appends /api to each route in the router so we can use that in frontend
app.use("/api", router);


// Always send the static files from server
app.get("/*", (req, res) => {
    res.sendFile(path.join(root, "index.html"))
});


// When server is started, it is logged on console
app.listen(port, () => {
    console.log(`Server running on ${port}`);
});

