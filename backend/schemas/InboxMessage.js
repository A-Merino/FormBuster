// imports
const mongoose = require('mongoose');

// schema for inbox messages
const InboxMessage = new mongoose.Schema({
    id: String,
    formID: String,
    rejected: String,
    reason: String,
    read: String,
    type: {
        type: String,
        enum: ['approval', 'signature'], // restricts possible values
        required: true,
        default: 'signature'
    }
});

module.exports = mongoose.model('InboxMessage', InboxMessage);