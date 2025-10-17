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

exports.markAllRead = async (req, res) => {
  try {
    const { userId } = req.body;
    const inbox = await UserInboxes.findOne({ id: userId });
    if (!inbox) return res.status(404).json({ message: 'Inbox not found' });

    await InboxMessage.updateMany(
      { id: { $in: inbox.messageIDs } },
      { $set: { read: "True" } }
    );

    res.json({ success: true, message: 'All messages marked as read' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteAllRead = async (req, res) => {
  try {
    const { userId } = req.body;
    const inbox = await UserInboxes.findOne({ id: userId });
    if (!inbox) return res.status(404).json({ message: 'Inbox not found' });

    // Find read messages
    const readMessages = await InboxMessage.find({
      id: { $in: inbox.messageIDs },
      read: "True"
    });

    const readIDs = readMessages.map(m => m.id);

    // Delete them
    await InboxMessage.deleteMany({ id: { $in: readIDs } });

    // Remove them from user's inbox list
    await UserInboxes.updateOne(
      { id: userId },
      { $pull: { messageIDs: { $in: readIDs } } }
    );

    res.json({ success: true, message: 'All read messages deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

