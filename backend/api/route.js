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
router.post("/createActive", submitForm)
router.post("/getActive", getActive)


// Form api calls
router.post("/saveForm", saveForm);
router.get("/getForms", getForms);
router.get("/getFormByName/:name", getFormByName);

module.exports = router;
