const express = require('express');
const router = express.Router();

// Import functions
const {saveForm, getForms, getFormByName, getFormName} = require("./../controllers/formFunctions.js");
const {register, signIn, findUser} = require("./../controllers/userFunctions.js");
const {getSession} = require("./../controllers/cookies.js");
const {validateUser, validateSignIn} = require("./../middleware/userVal.js");
const {submitForm, getActive, getSigUser} = require("./../controllers/currentFormFunctions.js");
const {findInboxMessages} = require("./../controllers/inboxFunctions.js");


// cookies
router.get("/get-session", getSession);

// registration and signing in
router.post("/register", validateUser, register);
router.post("/sign-in", signIn);

// other user functions
router.post("/getUser", findUser); // get one User


// current form stuff
router.post("/createActive", submitForm); // submits a Form
router.post("/getActive", getActive); // gets a form by ID
router.post("/getSigAndUser", getSigUser); // get a sinature from sigID

// Form api calls
router.post("/saveForm", saveForm); // save a form
router.get("/getForms", getForms); // get mutiple forms
router.get("/getFormByName/:name", getFormByName);
router.post('/getFormName', getFormName);

// Inbox api calls
router.post('/findInboxMessages', findInboxMessages);

module.exports = router;
