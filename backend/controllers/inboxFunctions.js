// imports
const UserInboxes = require('../schemas/UserInboxes');
const InboxMessage = require('../schemas/InboxMessage');

exports.findInboxMessages = async (req, res) => {
    try {
        const userId = req.body.id;
        const userInbox = await UserInboxes.findOne({ id: userId });

        let messages = [];
        if (!userInbox) {
            messages = [];
        } else {
            // fetch all messages using the messageIDs
            messages = await InboxMessage.find({ id: { $in: userInbox.messageIDs } });
        }
        
        res.status(201).json(messages);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }

}