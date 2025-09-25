// imports
const mongoose = require('mongoose');

// schema for inbox messages
const InboxMessage = new mongoose.Schema({
    id: String,
    formID: String,
    rejected: String,
    reason: String,
    read: String
    });

module.exports = mongoose.model('InboxMessage', InboxMessage);