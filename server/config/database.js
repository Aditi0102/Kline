const mongoose = require('mongoose');

const connectDatabase = () => {
    mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true}).then((data) => {
    console.log(`MongoDB connection successful with server`);
    }).catch((err) => {
    console.log(err);
    });
}

module.exports = connectDatabase;