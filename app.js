//import {} from 'dotenv/config';
import express from 'express';
import path from 'path';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import passport from 'passport';
import flash from 'connect-flash';
import session from 'express-session';
import config from './config/config';
import setupPassport from './config/authorization';
import createRoutes from './routes/index';
import upload from 'express-fileupload';

const app = express();
mongoose.connect(config.database.url, {useMongoClient: true});
mongoose.Promise = require('bluebird');

setupPassport(passport);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(upload());

app.use(session({
  secret: config.database.secret,
  resave: true,
  saveUninitialized: true
 }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

createRoutes(app, passport);

// catch 404 and forward to error handler
app.use( (req, res, next) => {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use( (err, req, res, next) => {
  // set locals, only providing error in development
  const env = req.app.get('env');
  res.locals.message = err.message;
  res.locals.error = env === 'development' ? err : {};

  if (env !== 'test') console.log(err);

  // render the error page
  res.status(err.status || 500);
  res.send({
    message: res.locals.message,
    error: res.locals.error
  });
});

export default app;
