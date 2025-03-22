const mongoose = require("mongoose");

const dbConnect = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/Senior_Design',
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            })
            .then(() => console.log('MongoDB connected successfully.'))
            .catch(err => console.log(err));
        console.log("Connected to the database");
    } catch (err) {
        console.error(err.message);
    }
}

module.exports = dbConnect;