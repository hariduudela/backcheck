const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/admin');
const bcrypt = require('bcryptjs');
const config = require('config');
const adminAuth = require('../modules/adminauthMiddleware');

//Admin login
router.post('/authenticate', (req, res, next) => {
    console.log('from authenticate',req.body)
    let username = req.body.username;
    let password = req.body.password;

    User.findOne({
        username: username
    }, (err, user) => {
        if (err) throw err;
        if (!user) {
            return res.json({
                success: false,
                msg: 'user not found'
            });
        }
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
                const token = jwt.sign({
                    userId: user._id,
                }, config.secret, {
                    expiresIn: 3 * 60 * 60
                });
                return res.json({
                    success: true,
                    token: token,
                    user: {
                        _id: user._id,
                        username: user.username,
                        email : user.email
                    }
                });
            }
            return res.json({
                success: false,
                msg: 'wrong password'
            });
        })
    })
})


//new users
router.post('/register', (req, res, next) => {
    //// password validation
   /* let strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
    if (!strongPasswordRegex.test(req.body.password)) {
        return res.json({
            success: false,
            message: "Weak password",
            hint: "password at least 1 lowercase character, 1 uppercase character, 1 numeric character, 1 special character, must be eight characters or longer"
        })
    }
    ///// email validation
    let emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    if (!emailRegex.test(req.body.email)) {
        return res.json({
            success: false,
            message: "wrong email format"
        })
    }
*/
    // newuser object to send to mongoose
    let newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });


    ///// generate salt to hash password
    bcrypt.genSalt(7, (err, salt) => {
        console.log(err);
        if (err) throw err;
        //// hash password
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save((err, user) => {
                if (err) {
                    return res.json({
                        success: false,
                        msg: 'failed to add user'
                    });
                }
                const token = jwt.sign({
                    userId: user._id,
                }, config.secret, {
                    expiresIn: 3 * 60 * 60
                });
                res.json({
                    success: true,
                    msg: 'user registerd',
                    token : token,
                    user: {
                        id: user._id,
                        username: user.username
                    }
                });
            })
        });

    });


})

// admin area
/// Authentication middleware allow admins only
router.use(adminAuth);


//get specific users
router.get('/:id', (req, res, next) => {
    User.findById(req.params.id, (err, user) => {
        if (err) console.error(err);
        if (user) {
            return res.json({
                success: true,
                user: {
                    id: user._id,
                    username: user.username,
                    email: user.email
                }
            });
        }
        res.json({
            success: false,
            msg: "user not found"
        })
    });
})


//delete users
router.delete('/:id', (req, res, next) => {
    User.findByIdAndRemove(req.params.id, (err, user) => {
        if (err) console.error(err);
        if (user) {
            return res.json({
                success: true,
                user: {
                    id: user._id,
                    username: user.username,
                    email: user.email
                }
            })
        }
        res.json({
            success: false,
            msg: 'user not found',
        })
    });
})

//edit users
router.put('/:id', (req, res, next) => {
    User.findByIdAndUpdate(req.params.id, {
        $set: {
            email: req.body.email
        }
    }, {
        new: true
    }, (err, user) => {
        if (err) console.error(err);
        if (user) {
            return res.json({
                success: true,
                user: {
                    id: user._id,
                    username: user.username,
                    email: user.email
                }
            })
        }
        res.json({
            success: false,
            msg: 'user not found or wrong data',
            err: err.message
        })

    });
})

// get all
router.get('/', (req, res, next) => {

    User.find((err, users) => {
        if (err) console.error(err);
        if (users) {
            return res.json({
                success: true,
                users: users.map((user) => {
                    return {
                        id: user._id,
                        username: user.username,
                        email: user.email
                    }
                })
            });
        }
        res.json({
            success: false,
            msg: "no users found"
        })
    })
})

module.exports = router;
