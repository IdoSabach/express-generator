const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const coolRouter = require('./routes/cool');
const contactRouter = require('./routes/contact'); // Ensure this matches the new filename

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/cool', coolRouter);
app.use('/contact', contactRouter); // Correct path

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

// connect to MongoDB
const connectToDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/mydatabase", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

connectToDB();

module.exports = app;
