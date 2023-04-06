const express = require('express');
const connectDB = require('./config/db.js');
const bodyParser = require('body-parser');
require('express-validator');
const mongoose = require("mongoose");

const app = express();

//Connect Database
connectDB();
//Init Middleware
app.use(bodyParser.json())
// try {
//     mongoose.connect('mongodb+srv://ahmed:ahmed@cluster0.heix1.mongodb.net/?retryWrites=true&w=majority')
//     console.log('Mongoose connected');
// } catch (e) {
//     console.log(e);
// }
app.get('/', (req,res) => {
    res.send("API started")
});

// Define Routes
app.use('/api/users', require('./routes/api/users.js'));
app.use('/api/auth', require('./routes/api/auth.js'));
app.use('/api/profile', require('./routes/api/profile.js'));
app.use('/api/posts', require('./routes/api/post.js'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})
