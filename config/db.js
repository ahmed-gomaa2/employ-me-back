const mongoose = require('mongoose');
const mongoURI = require('../keys/index').mongURI;


const connectDB = async () => {
    try {
        const mongoo = await mongoose.connect(mongoURI);
        console.log('Mongoose connected!');
    }catch (err) {
        console.error(err.message);
        //exit process with failure
        process.exit(1)
    }
}

module.exports = connectDB;
