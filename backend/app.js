// Import modules
const express = require("express");
const fs = require('fs');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const jsonParse = bodyParser.json();
const session = require('express-session');
const dbConnect = require('./config/db');
const router = require('./api/route');


dbConnect();

// Create app and set port
const app = express();
const port = 3000;


// create root to index.html
const root = path.join(__dirname, "client", "dist")

// create a session for cookies
app.use(session({
    secret:"verySecretSecret",
    resave: false,
    saveUninitialized: false,   
}))


// Set all the middleware and files that the app will use
app.use('/', express.static(root));

// json serialization and parsing!!!!
app.use(jsonParse);
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use("/api", router);

// Always send the static files from server
app.get("/*", (req, res) => {
    res.sendFile(path.join(root, "index.html"))
});


// When server is started, it is logged on console
app.listen(port, () => {
    console.log(`Server running on ${port}`);
});

