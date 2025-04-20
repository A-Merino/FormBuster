const mongoose = require("mongoose");

const dbConnect = async () => {
    await mongoose.connect('mongodb://localhost:27017/Senior_Design', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        .then(() => console.log('MongoDB connected successfully.'))
        .catch(err => console.log(err));

        // connect to database and get current collections
        let db = await mongoose.connection;
        var colls = await db.listCollections();

        // grab all the names from the collections 
        let names = [];

        colls.map(c => {
            names.push(c.name);
        })

        // We need 3 databases, check if they are already made
        // if not then create them on open
        if (!names.includes('users')) {
            db.createCollection("users");
        }

        if (!names.includes('formtemplates')) {
            db.createCollection("formtemplates");
        }

        if (!names.includes('currentforms')) {
            db.createCollection("currentforms");
        }

}

module.exports = dbConnect;