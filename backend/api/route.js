const express = require('express');
const router = express.Router();

// Import functions
const {saveForm, getForms, getFormByName} = require("./../controllers/formFunctions.js")
const {register} = require("./../controllers/userFunctions.js")
const {getSession} = require("./../controllers/cookies.js")


// Route
router.get("/get-session", getSession);

router.post("/register", register);

router.post("/saveForm", saveForm);
router.get("/getForms", getForms);
router.get("/getFormByName/:name", getFormByName);

module.exports = router;
