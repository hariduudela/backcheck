var express = require('express');
var router = express.Router();
var mongoonse = require('mongoose');
var multer = require('multer');
var nodemailer = require('nodemailer');
var bcrypt = require('bcryptjs');
/*const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  }
});
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
    cb(null, true);
  }
  else {
    cb(null, false);
  }
}
const upload = multer({ storage: storage, limits: { fileSize: 1024 * 1024 * 6 }, fileFilter: fileFilter });
*/
var Employee = require('../models/employee');
var Payment  = require('../models/payment');
/*
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});*/

router.post("/register", (req, res, next) => {
  console.log(req.body);
  let password = bcrypt.hashSync(req.body.name + '' + req.body.idcard, 10);
  let prepassword = req.body.name + '' + req.body.idcard;
  const employee = new Employee({
    _id: new mongoonse.Types.ObjectId(),
    email: req.body.email,
    name: req.body.name,
    idcard: req.body.idcard,
    dob: req.body.dob,
    gender: req.body.gender,
    city: req.body.city,
    state: req.body.state,
    postcode: req.body.postcode,
    mobilenumber: req.body.mobilenumber,
    address: req.body.address,
    password: password,
    status: req.body.status,
    prepassvalue: prepassword,
    employee: req.body.employee,


  });
  console.log(employee);

  Employee.findOne({ 'email': req.body.email }, (err, data) => {
    //  console.log(data);

    if (data) {
      res.json({
        success: false,
        msg: "employee already registered"
      })
    }
    else {
      employee.save().then(result => {
        //console.log(result);
        res.json({
          success: true,
          result: result
        });
      }).catch(err => console.log(err));
      /* res.status(201).json({
         success: "Handling Post requests to users",
         msg: user
       })
   */
    }
  });

});


//change password users
router.post('/changepassword/', (req, res, next) => {
  let changepassword = bcrypt.hashSync(req.body.newpassword, 10);
  //console.log(changepassword);
  Employee.findByIdAndUpdate(req.body.id, {
    $set: {
      password: changepassword,
      prepassvalue: req.body.newpassword
    }
  }, {
      new: true
    }, (err, user) => {
      if (err) console.error(err);
      if (user) {
        return res.json({
          success: true,
          msg: "Changed Password",
        })
      }
      res.json({
        success: false,
        msg: 'Mot found or wrong data',
        err: err.message
      })

    });

})



//edit users
router.put('/edit/:id', (req, res, next) => {
  Employee.findByIdAndUpdate(req.params.id, {
    $set: {
      email: req.body.email,
      name: req.body.name,
      idcard: req.body.idcard,
      dob: req.body.dob,
      gender: req.body.gender,
      city: req.body.city,
      state: req.body.state,
      postcode: req.body.postcode,
      mobilenumber: req.body.mobilenumber,
      address: req.body.address,
      status: req.body.status,
      employee: req.body.employee,
    }
  }, {
      new: true
    }, (err, data) => {
      if (err) console.error(err);
      if (data) {
        return res.json({
          success: true,
          user: data
        })
      }
      res.json({
        success: false,
        msg: 'Employee not found or wrong data',
        err: err.message
      })

    });
})

router.get('/display/:id', (req, res, next) => {
  Employee.findById(req.params.id, (err, data) => {
    if (err) console.error(err);
    if (data) {
      return res.json({
        success: true,
        user: data
      });
    }
    res.json({
      success: false,
      msg: "Employee not found"
    })
  });
})
//user application status
router.post('/statusapp', function (req, res, next) {
  Employee.findOne({ 'idcard': req.body.userid }, (err, data) => {
    if (data) {
      return res.json({
        success: true,
        status: data
      });
    }
    else {
      res.json({
        success: false,
        msg: "Employee not found"
      });
    }
  });
});



router.post('/forgot', function (req, res, next) {
  Employee.findOne({ 'email': req.body.email }, (err, data) => {
    //  console.log(data);
    if (data) {
      var mailOptions = {
        from: 'finterraapp@gmail.com',
        to: 'hari04hari@gmail.com',
        subject: 'email subject',
        text: 'email body',
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
          tls: {
            rejectUnauthorized: false
          }
        });
      smtpTransport.sendMail(mailOptions, (err, info) => {
        if (!err) {
          res.json({
            success: true,
            msg: 'user data',
            err: err.message
          })

        }
        res.json({
          success: false,
          msg: 'not sent wrong data',
          err: err.message
        })

      });
    }
    else {
      res.json({
        success: false,
        msg: "Employee not found "
      })
    }
  });

});

router.post('/checklogin', (req, res, next) => {
  let email = req.body.email;
  let password = req.body.password;
  Employee.findOne({ 'email': email }, (err, data) => {


    if (data) {
      if (bcrypt.compareSync(password, data.password)) {
        // Passwords match
        console.log(data);
        res.json({
          success: true,
          user: {
            _id: data._id,
            username: data.name,
            idcard: data.idcard,
            userid: data._id,
            email: data.email
          }
        });
      } else {
        res.json({
          success: false,
          msg: "Wrong Password"
        });
      }

    }
    else {
      return res.json({
        success: false,
        status: "Employee Not found"
      });
    }


  });
});




router.get('/appstatus/:status', function (req, res, next) {
  Employee.find({ 'status': req.params.status }, (err, data) => {
    if (data) {
      return res.json({
        success: true,
        list: data
      });
    }
    else {
      res.json({
        success: false,
        msg: "user not found"
      });
    }
  });
});

router.get('/payments', function (req, res, next) {
  //res.send();
  Payment.find({}, (err, data) => {
    res.json(data)
  });
}); 


router.get('/employeelist', function (req, res, next) {
  //res.send();
  Employee.find({}, (err, users) => {
    res.json(users)
  });
  /*var mailOptions = {
    from: 'Hello <hari04hari@email.com>',
    to: 'hari@teccsa.co.in',
    subject: 'email subject',
    text: 'email body',
    html: 'html body'
  };

  var smtpTransport = nodemailer.createTransport(
    {
      service: "gmail",
      host: "smtp.gmail.com",
      auth: {
        user: "finterraapp@gmail.com",
        pass: "o8776542223"
      }
    });
  smtpTransport.sendMail(mailOptions, function (err) {
    if (!err) {
      res.send({
        message: 'Email has been sent'
      });
    }

    done(err);
  });*/
})



//delete users
router.delete('/delete/:id', (req, res, next) => {
  Employee.findByIdAndRemove(req.params.id, (err, data) => {
    if (err) console.error(err);
    if (data) {
      return res.json({
        success: true,
        user: data

      })
    }
    res.json({
      success: false,
      msg: 'Employee not found',
    })
  });
})




module.exports = router;
