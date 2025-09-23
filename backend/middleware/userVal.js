// imports and mongodb connection
const {check, validationResult} = require('express-validator');
let mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/Senior_Design")
let db = mongoose.connection;
const coll = db.collection('users');



/*
Checks:
    First Name:
        - Is not empty
    Last Name:
        - Is not empty
    Email:
        - Is not empty
        - A valid email
        - and checks if email is already in database

*/

exports.validateUser = [
    check('firstName').trim().not().isEmpty()
        .withMessage("First Name is required").bail(),
    check('lastName').trim().not().isEmpty()
        .withMessage("Last Name is required").bail(),
    check('email').trim().not().isEmpty()
        .withMessage('Email is required').bail()
        .escape().isEmail()
        .withMessage('Not a Valid Email').bail()
        .normalizeEmail()
        .custom((email) => {
            return coll.findOne({"email":email})
            .then(result => {

                if (result !== null) {
                    return Promise.reject('Email Exists');
                } 
            })
        }).withMessage("Email in Use").bail(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()){
            return res.status(422).json({errors: errors.array()})
        }
        next();
    },
];


/*

Checks:
    Password:
        - if empty
    Email:
        - is not empty
        - if it is in database
*/

exports.validateSignIn = [

    check('password').trim().not().isEmpty()
        .withMessage("Password is required").bail(),
    check('email').trim().not().isEmpty()
        .withMessage('Email is required').bail()
        .escape().isEmail()
        .withMessage('Not a Valid Email').bail()
        .normalizeEmail()
        .custom((email) => {
            return coll.findOne({"email":email})
            .then(result => {

                if (result === null) {
                    return Promise.reject('No Account Associated with Email');
                } 
            })
        }).withMessage("No Account Associated with Email").bail(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()){
            return res.status(422).json({errors: errors.array()})
        }
        next();
    },
];
