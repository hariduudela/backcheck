var express = require('express');
var router = express.Router();
var mongoonse = require('mongoose');
var multer = require('multer');
var nodemailer = require('nodemailer');


router.post('/single', function (req, res, next) {
 //console.log(req.body.email+','+req.body.email+','+req.body.message);
 send_email(req.body.number, req.body.message);

});


function send_email(email,subject, message, res, next){
    //console.log(email+','+email+','+message);
    
    
}

module.exports = router;
