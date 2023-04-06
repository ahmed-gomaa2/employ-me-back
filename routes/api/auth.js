const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const {check, validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const jwtSecret = process.env.jwt_secret;
//@route     get api/auth
//@desc      authenticate user & get token
//@access    public
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.send(user);
    }catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error")
    }
})

// @route     Post api/

router.post('/', [
    check('email', 'Please Provide a valid Email').isEmail(),
    check('password', 'Password is required').exists()
], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    const {email, password} = req.body;
    try {
        // See if user exists
        let user = await User.findOne({email});
        if(!user) {
            res.status(400).json({errors: [{msg: 'Invalid Credentials'}]})
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({errors: [{msg: 'Invalid Credentials'}]})
        }
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
