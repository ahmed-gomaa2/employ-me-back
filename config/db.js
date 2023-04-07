const mongoose = require('mongoose');
require('dotenv').config();


const connectDB = async () => {
    try {
        const mongoURI = process.env.mongoURI;
        await mongoose.connect(mongoURI);
        console.log('Mongoose connected!');
    }catch (err) {
        console.error(err.message);
        //exit process with failure
        process.exit(1)
    }
}

module.exports = connectDB;
