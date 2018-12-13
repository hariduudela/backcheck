const jwt = require('jsonwebtoken');
const User = require('../models/admin');
const config = require('config');

module.exports =(req, res, next) => {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token) {
        jwt.verify(token, config.secret, (err, decoded) => {
            if (err) {
                return res.json({
                    success: false,
                    message: 'Failed to authenticate token.'
                });
            } else {
                User.findById(decoded.userId, (err, user) => {
                    if (user && user.admin) {
                        req.decoded = decoded;
                        next();
                    } else {
                        return res.status(403).send({
                            success: false,
                            message: 'Admins area.'
                        });
                    }
                })
            }
        });
    } else {
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });
    }
}
