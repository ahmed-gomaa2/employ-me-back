const mongoose = require('mongoose');


const connectDB = async () => {
    try {
        const mongoo = await mongoose.connect(process.env.mongoURI);
        console.log('Mongoose connected!');
    }catch (err) {
        console.error(err.message);
        //exit process with failure
        process.exit(1)
    }
}

module.exports = connectDB;
