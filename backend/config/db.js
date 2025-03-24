const mongoose = require("mongoose");

const dbConnect = async () => {
    await mongoose.connect('mongodb://localhost:27017/Senior_Design', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        .then(() => console.log('MongoDB connected successfully.'))
        .catch(err => console.log(err));
}

module.exports = dbConnect;