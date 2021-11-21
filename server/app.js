const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const indexRouter = require('./routes/indexRouter');
const usersRouter = require('./routes/usersRouter');
const giftRouter = require('./routes/giftRouter');
const adminRouter = require('./routes/adminRouter');

const app = express();
const port = process.env.PORT || 5000;
const uri = process.env.ATLAS_URI;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

mongoose
  .connect(uri, {
    useNewUrlParser: true
  })
  .then(() => console.log("Connected to database"))

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/wishlist', giftRouter);
app.use('/admin', adminRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

module.exports = app;
