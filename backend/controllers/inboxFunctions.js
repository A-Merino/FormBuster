// imports
const UserInboxes = require('../schemas/UserInboxes');
const InboxMessage = require('../schemas/InboxMessage');

exports.findInboxMessages = async (req, res) => {
    try {
        const { userId } = req.params;
        const userInbox = await UserInboxes.findOne({ id: userId });

        if (!userInbox) {
            return res.status(404).json({ error: 'User inbox not found' });
        }

        // fetch all messages using the messageIDs
        const messages = await InboxMessage.find({ id: { $in: userInbox.messageIDs } });

        res.status(201).json(messages);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }

}