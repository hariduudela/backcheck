var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var cors = require('cors');
var bodyParser =require('body-parser');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var adminRouter = require('./routes/adminregister');
var employeeRouter = require('./routes/employees');
var sendemailRouter = require('./routes/sendemails');
var smsRouter = require('./routes/messages');
var uploaderRouter = require('./routes/upload');
var nodemailer = require('nodemailer');
var app = express();

app.use(cors({
  origin:['http://localhost:4200','http://127.0.0.1:4200'],
  credentials:true
}));

var mongoose =require('mongoose');

mongoose.connect('mongodb://pbbm:p12345@ds127954.mlab.com:27954/pbbmapp?authSource=pbbmapp&w=1',{ useNewUrlParser: true });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/public', express.static('public'))

app.use('/api/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/admin', adminRouter);
app.use('/api/employees', employeeRouter);
app.use('/api/sendemails', sendemailRouter);
app.use('/api/sendmessages', smsRouter);
app.use('/api/uploadimage', uploaderRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
