// imports
const mongoose = require('mongoose');

// schema for user's inboxes
const UserInboxes = new mongoose.Schema({
    id: String,
    messageIDs: [String]
    });

module.exports = mongoose.model('UserInboxes', UserInboxes);