const express = require('express');
const connectDB = require('../config/db.js');
const bodyParser = require('body-parser');
require('express-validator');
const mongoose = require("mongoose");
const cors = require('cors');
const serverless = require('serverless-http');

const app = express();
const router = express.Router();

//Connect Database
connectDB();
//Init Middleware
app.use(bodyParser.json());
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'UPDATE', 'PUT']
}));

router.get('/home', (req,res) => {
    res.send("API started")
});

// Define Routes
app.use('/api/users', require('../routes/api/users.js'));
app.use('/api/auth', require('../routes/api/auth.js'));
app.use('/api/profile', require('../routes/api/profile.js'));
app.use('/api/posts', require('../routes/api/post.js'));

const PORT = process.env.PORT || 8080;

app.use('/.netlify/functions/api', router);

module.exports = app;
module.exports.handler = serverless(app);
//
// app.listen(PORT, () => {
//     console.log(`Server started on port ${PORT}`)
// })
