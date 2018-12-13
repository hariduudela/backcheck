var express = require('express');
var router = express.Router();
var mongoonse = require('mongoose');
var multer = require('multer');
var nodemailer = require('nodemailer');
var bcrypt = require('bcryptjs');
const storage = multer.diskStorage({
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
var User = require('../models/user');
var Ppbmno = require('../models/pbbmno');
var Payment = require('../models/payment');

router.get('/pass', async function (req, res, next) {



  /*Ppbmno.findOne({ '_id': "PPBMNO" }, (err, data) => {
    //var id = data.seq;
    id =data;
    //res.send(data);
  }); 
  res.send(id);*/

  //res.send();
  /* const ppbmno = new Ppbmno({
     _id:"PPBMNO",
     seq:"30000",
   });
   ppbmno.save().then(result => {
     //console.log(result);
     res.json({
       success: true,
       result: result
     });
   });*/
  /*
    let id = 'PPBMNO';
    Ppbmno.findOneAndUpdate(id, {
      $inc: {
        seq: 1
      }
    }, {
        new: true
      }, (err, user) => {
        if (err) console.error(err);
        if (user) {
          return res.json({
            success: true,
            user: user
          })
        }
        res.json({
          success: false,
          msg: 'user not found or wrong data',
          err: err.message
        })
  
      });
    // let hash = bcrypt.hashSync('123456', 10);
    //res.send(hash);*/
});

/*router.post("/register", upload.fields([
  { name: 'photo' },
  { name: 'photoid' },
]), (req, res, next) => {
  //console.log(req.file.path);
  var currentTime = new Date();
  var idcardnumber= req.body.idcard1 + "-" + req.body.idcard2 + '-' + req.body.idcard3;
  const user = new User({
    _id: new mongoonse.Types.ObjectId(),
    email: req.body.email,
    name: req.body.name,
    idcard: req.body.idcard1 + "-" + req.body.idcard2 + '-' + req.body.idcard3,
    userid: req.body.idcard1 + "" + req.body.idcard2 + '' + req.body.idcard3,
    dob: req.body.dob,
    gender: req.body.gender,
    voter: req.body.voter,
    city: req.body.city,
    state: req.body.state,
    postcode: req.body.postcode,
    mobilenumber: req.body.mobilenumber,
    address: req.body.address,
    plan: req.body.pland,
    price: req.body.priced,
    race: req.body.race,
    ostate: req.body.ostate,
    division: req.body.division,
    branch: req.body.branch,
    vocation: req.body.vocation,
    lanjuntan: req.body.lanjuntan,
    status: 'Approved',
    country: req.body.country,
    ackitivi: req.body.ackitivi,
    profileimage: '',
    profileidcard: '',
    created_date: currentTime.getDate(),
    month: currentTime.getMonth() + 1,
    year: currentTime.getFullYear(),
    ppbmno: '00000300000',
    paymentstatus: res.body.paymentstatus,
    paymentdate: res.body.paymentdate,
    paymentid: res.body.paymentid,
    password: 'sdfsdf',

  });


  User.findOne({ 'idcard': req.body.idcardnumber }, (err, data) => {
    //  console.log(data);

    if (data) {
      res.json({
        success: false,
        msg: "user already registered"
      })
    }
    else {
      user.save().then(result => {
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
//}
// });

//});




//check user exit
router.post('/register', upload.any(), async function (req, res, next) {
  var currentTime = new Date();
  var idcardnumber = req.body.idcard1 + "-" + req.body.idcard2 + '-' + req.body.idcard3;
  let password = bcrypt.hashSync(req.body.name + '' + req.body.idcard3, 10);
  let checkId = "PPBMNO";
  let newppbmno = await Ppbmno.findById(checkId);
  // console.log(newppbmno.seq);

  const user = new User({
    _id: new mongoonse.Types.ObjectId(),
    email: req.body.email,
    name: req.body.name,
    idcard: req.body.idcard1 + "-" + req.body.idcard2 + '-' + req.body.idcard3,
    userid: req.body.idcard1 + "" + req.body.idcard2 + '' + req.body.idcard3,
    dob: req.body.dob,
    paymentstatus: req.body.paymentstatus,
    paymentdate: req.body.paymentdate,
    paymentid: req.body.paymentid,
    gender: req.body.gender,
    voter: req.body.voter,
    city: req.body.city,
    state: req.body.state,
    postcode: req.body.postcode,
    mobilenumber: req.body.mobilenumber,
    address: req.body.address,
    plan: req.body.pland,
    fee: req.body.priced,
    mainplan:req.body.mainplan,
    race: req.body.race,
    ostate: req.body.ostate,
    division: req.body.division,
    branch: req.body.branch,
    vocation: req.body.vocation,
    lanjuntan: req.body.lanjuntan,
    status: 'Approved',
    country: req.body.country,
    telnumber:req.body.telnumber,
    ceremah: req.body.ceremah,
    ackitivi: req.body.ackitivi,
    profileimage: req.body.profileimage,
    profileidcard: req.body.profileidcards,
    creation_dt: currentTime.getDate(),
    month: currentTime.getMonth() + 1,
    year: currentTime.getFullYear(),
    ppbmno: newppbmno.seq,
    password: password,
    prepassvalue: req.body.name + '' + req.body.idcard3,
    photo: req.body.photofilename,
    photoid:req.body.photoidfilename,
    photopath:req.body.photofilepath,
    photoidpath:req.body.photoidfilepath,
  });
  const payment = new Payment({
    _id: new mongoonse.Types.ObjectId(),
    email: req.body.email,
    name: req.body.name,
    idcard: req.body.idcard1 + "-" + req.body.idcard2 + '-' + req.body.idcard3,
    userid: req.body.idcard1 + "" + req.body.idcard2 + '' + req.body.idcard3,
    paymentstatus: req.body.paymentstatus,
    paymentdate: req.body.paymentdate,
    paymentid: req.body.paymentid,
    fee: req.body.priced,
    ppbmno: newppbmno.seq,
  });
  User.findOne({ 'idcard': idcardnumber }, (err, data) => {
    //  console.log(data);

    if (data) {
      res.json({
        success: false,
        msg: "user already registered"
      })
    }
    else {
      user.save().then(result => {
        //console.log(result);
        payment.save().then(result => {

        });
        res.json({
          success: true,
          result: result
        });
        let id = 'PPBMNO';
        Ppbmno.findOneAndUpdate(id, {
          $inc: {
            seq: 1
          }
        }, {
            new: true
          }, (err, user) => {

          });
          /*
        var mailOptions = {
          from: 'finterraapp@gmail.com',
          to: req.body.email,
          subject: 'Successfully Registerd in PPBM ',
          text: 'email body',
          html: 'html body',
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
              msg: 'Email sent to your mailid',
              err: err.message
            })

          }
          res.json({
            success: "fail",
            msg: 'Email not sent wrong data',
            err: err.message
          })

        });*/
      }).catch(err => console.log(err));

      //console.log('datta  inserted');
    }
  });
});

//edit users
router.post('/edit/', (req, res, next) => {
  User.findByIdAndUpdate(req.params.id, {
    $set: {
      password: req.body.password
    }
  }, {
      new: true
    }, (err, user) => {
      if (err) console.error(err);
      if (user) {
        return res.json({
          success: true,
          user: user
        })
      }
      res.json({
        success: false,
        msg: 'user not found or wrong data',
        err: err.message
      })

    });
})



//change password users
router.post('/changepassword/', (req, res, next) => {
  let changepassword = bcrypt.hashSync(req.body.newpassword, 10);
  //console.log(changepassword);
  User.findByIdAndUpdate(req.body.id, {
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

router.get('/display/:id', (req, res, next) => {
  User.findById(req.params.id, (err, user) => {
    if (err) console.error(err);
    if (user) {
      return res.json({
        success: true,
        list: user
      });
    }
    res.json({
      success: false,
      msg: "user not found"
    })
  });
})
//user application status
router.post('/statusapp', function (req, res, next) {
  User.findOne({ 'userid': req.body.userid }, (err, data) => {
    if (data) {
      return res.json({
        success: true,
        status: data
      });
    }
    else {
      res.json({
        success: false,
        msg: "User not found"
      });
    }
  });
});

router.post('/checklogin', (req, res, next) => {
  let userid = req.body.userid;
  let password = req.body.password;
  User.findOne({ 'userid': userid }, (err, data) => {


    if (data) {
      if (bcrypt.compareSync(password, data.password)) {
        // Passwords match
        console.log(data);
        res.json({
          success: true,
          user: {
            _id: data._id,
            username: data.username,
            idcard: data.idcard,
            userid: data.userid,
            ppbmno: data.ppbmno,
            email: data.email
          }
        });
      } else {
        // Passwords don't match
        console.log("sdds");
      }

    }
    else {
      return res.json({
        success: false,
        status: "not found"
      });
    }


  });
});


//check user exit
router.post('/checkregister',  upload.fields([
  { name: 'photo' },
  { name: 'photoid' },
]), async function (req, res, next) {
  User.findOne({ 'idcard': req.body.idcard }, (err, data) => {
    console.log(data);
   // console.log(req.files);
    if (data) {
      res.json({
        success: false,
        msg: "user not found"
      });
    }
    else {
      return res.json({
        success: true,
        status: data,
        display:req.files
      });
    }
  });
});

router.post('/forgot', function (req, res, next) {
  User.findOne({ 'userid': req.body.userid }, (err, data) => {
    console.log(data.email + ',' + data.password);
    if (data) {
      var mailOptions = {
        from: 'finterraapp@gmail.com',
        to: data.email,
        subject: 'Forgot Password',
        text: 'email body',
        html: 'html body' + data.password,
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
            msg: 'Email sent to your mailid',
            err: err.message
          })

        }
        res.json({
          success: "fail",
          msg: 'Email not sent wrong data',
          err: err.message
        })

      });
    }
    else {
      res.json({
        success: false,
        msg: "No user not found "
      })
    }
  });

});
/*
router.get('/status/:status', (req, res, next) => {
 
  User.find({status: req.params.status}, (err, data) => {
    console.log(data);
    if (err) console.error(err);
    if (data) {
      return res.json({
        success: true,
        user: data
      });
    }
    res.json({
      success: false,
      msg: "user not found"
    })
  });
})*/


router.get('/appstatus/:status', function (req, res, next) {
  if(req.params.status == "All"){
    checkusers ={};
  }
  else{
    checkusers= { 'status': req.params.status };
  }
  User.find(checkusers, (err, data) => {
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


router.get('/userlist', function (req, res, next) {
  //res.send();
  User.find({}, (err, users) => {
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
  User.findByIdAndRemove(req.params.id, (err, user) => {
    if (err) console.error(err);
    if (user) {
      return res.json({
        success: true,
        user: user

      })
    }
    res.json({
      success: false,
      msg: 'user not found',
    })
  });
})




module.exports = router;
