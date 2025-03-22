const mongoose = require('mongoose');

const FormTemplate = new mongoose.Schema({
    name: String,
    data: String
    });

module.exports = mongoose.model('FormTemplate', FormTemplate);