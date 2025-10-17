const express = require('express');
const router = express.Router();

// Import functions
const {saveForm, getForms, getFormByName, getFormName, getFormTemplate} = require("./../controllers/formFunctions.js");
const {register, signIn, findUser} = require("./../controllers/userFunctions.js");
const {getSession} = require("./../controllers/cookies.js");
const {validateUser, validateSignIn} = require("./../middleware/userVal.js");
const {submitForm, getActive, getSigUser, getAllActive, deleteForm} = require("./../controllers/currentFormFunctions.js")
const {findInboxMessages, markAllRead, deleteAllRead} = require("./../controllers/inboxFunctions.js");
const {getSig, updateSig} = require('./../controllers/sigFunctions.js')

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
router.post("/getSig", getSig); // get a signature from sigID

// update signature
router.post("/updateSignature", updateSig);

// admin current forms
router.post("/deleteForm", deleteForm);
router.get("/getAllActive", getAllActive);

// Form api calls
router.post("/saveForm", saveForm); // save a form
router.get("/getForms", getForms); // get mutiple forms
router.get("/getFormByName/:name", getFormByName);
router.post('/getFormName', getFormName);
router.post('/getFormTemp', getFormTemplate);

// Inbox api calls
router.post('/findInboxMessages', findInboxMessages);
router.post('/markAllRead', markAllRead);
router.post('/deleteAllRead', deleteAllRead);

module.exports = router;
