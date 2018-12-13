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
/*const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
}*/
const upload = multer({ storage: storage, limits: { fileSize: 1024 * 1024 * 10 } });

router.post('/upload', upload.fields([
    { name: 'photo' },
    { name: 'photoid' },
  ]), async function (req, res, next) {
    console.log('sdfsdfsdf');
    //const tempath= req.files.photo.name;
    console.log(req.file);
    res.json({
        success: true,
        display: req.files,
      });

});



module.exports = router;
