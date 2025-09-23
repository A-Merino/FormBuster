// imports
const mongoose = require('mongoose');

// schema for form template
const FormTemplate = new mongoose.Schema({
    id: String,
    name: String,
    data: String
    });

module.exports = mongoose.model('FormTemplate', FormTemplate);