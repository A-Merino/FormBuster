const express = require('express');
const router = express.Router();

// Import functions
const {saveForm, getForms, getFormByName} = require("./../controllers/formFunctions.js")
const {register, signIn} = require("./../controllers/userFunctions.js")
const {getSession} = require("./../controllers/cookies.js")
const {validateUser, validateSignIn} = require("./../middleware/userVal.js");
const {submitForm, getActive} = require("./../controllers/currentFormFunctions.js")


// cookies
router.get("/get-session", getSession);

// registration and signing in
router.post("/register", validateUser, register);
router.post("/sign-in", signIn);

// current form stuff
router.post("/createActive", submitForm) // submits a Form
router.post("/getActive", getActive) // gets a form by ID


// Form api calls
router.post("/saveForm", saveForm); // save a form
router.get("/getForms", getForms); // get mutiple forms
router.get("/getFormByName/:name", getFormByName);


module.exports = router;
