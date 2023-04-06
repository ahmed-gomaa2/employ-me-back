const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');
const User = require('../../models/User.js');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../keys');
const jwtSecret = process.env.jwt_secret;

//@route     get api/users
//@desc      Register route
//@access    public
router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please Provide a valid Email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({min: 6})
], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    const {name, email, password} = req.body;
    try {
        // See if user exists
        let user = await User.findOne({email});
        if(user) {
            res.status(400).json({errors: [{msg: 'User already exists'}]})
        }

        // getting user avatar
        const avatar = gravatar.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm'
        })

        //creating new user
        user = new User({
            name,
            email,
            avatar,
            password
        })

        // incrypt the password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        // save the user
        await user.save();

        // working on the jsonwebtoken
        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(
            payload,
            jwtSecret,
            {expiresIn: 36000000},
            (err, token)=>{
            if(err) {
                console.log(err);
            }else {
                res.json({token});
            }
        })
    }catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }

})

module.exports = router;
