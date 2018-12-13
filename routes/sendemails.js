var express = require('express');
var router = express.Router();
var mongoonse = require('mongoose');
var multer = require('multer');
var nodemailer = require('nodemailer');


router.post('/single', function (req, res, next) {
 //console.log(req.body.email+','+req.body.email+','+req.body.message);
 send_email(req.body.email,req.body.subject, req.body.message);

});


function send_email(email,subject, message, res, next){
    //console.log(email+','+email+','+message);
    var mailOptions = {
        from: 'finterraapp@gmail.com',
        to: email,
        subject: subject,
        text: message,
        html: 'html body'
      };

      var smtpTransport = nodemailer.createTransport(
        {
          service: "gmail",
          secure: false,
          port: 25,
          host: "smtp.gmail.com",
          auth: {
            user: "finterraapp@gmail.com",
            pass: "o8776542223"
          },
          tls:{
            rejectUnauthorized:false
          }
        });
      smtpTransport.sendMail(mailOptions, (err, info)=> {
        if (!err) {
          
          
        }
        
        
      });
    
}

module.exports = router;
