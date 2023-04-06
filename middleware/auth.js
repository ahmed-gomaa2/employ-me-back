const jwt = require('jsonwebtoken');
const keys = require('../keys');

const jwtSecret = process.env.jwt_secret;

module.exports = (req, res, next) => {
    // Get token from the header
    const token = req.header('x-auth-token');

    //check if no token
    if(!token) {
        return res.status(401).json({msg: 'No token, authorization denied'});
    }

    try {
        const decoded = jwt.verify(token, jwtSecret);
        req.user = decoded.user;
        next();
    }catch (err) {
        res.status(401).json({msg: 'Token is not valid'});
    }
}
