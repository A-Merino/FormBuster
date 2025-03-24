const express = require('express');
const router = express.Router();

// Import functions
const {saveForm, getForms, getFormByName} = require("./../controllers/formFunctions.js")
const {register, signIn} = require("./../controllers/userFunctions.js")
const {getSession} = require("./../controllers/cookies.js")
const {validateUser, validateSignIn} = require("./../middleware/userVal.js");



// Route
router.get("/get-session", getSession);

// registration and signing in
router.post("/register", validateUser, register);
router.post("/sign-in", validateSignIn, signIn);



router.post("/saveForm", saveForm);
router.get("/getForms", getForms);
router.get("/getFormByName/:name", getFormByName);

module.exports = router;
