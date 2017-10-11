// Import all necessary files

import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express from 'express';
import expressValidator from 'express-validator';
import flash from 'connect-flash';
import mongo from 'mongodb';
import mongoose from 'mongoose';
import passport from 'passport';
import path from 'path';
import session from 'express-session';
import compression from 'compression';
import sendMail from './src/routes/mailer';
import addEmailToMailChimp from './src/routes/mailchimp';
// var keys = require('./config/keys');

// Initialize express, port, and mongoose

const app = express();
const port = process.env.PORT || 3000;
// mongoose.connect(keys.mongoURI);

// Routes

const adminRouter = require('./src/routes/adminRoutes');
const authRouter = require('./src/routes/authRoutes');

// Compress static files
app.use(compression());
// Express code
app.use(express.static(`${process.cwd()}/public`));

import handlebars from 'express-handlebars';

app.engine('handlebars', handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(cookieParser());
app.use(express.static('public'));
app.use(session({secret: 'machine_la ', resave: true, saveUninitialized: true}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(passport.initialize());
app.use(passport.session());

// Validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
    var namespace = param.split('.'),
      root = namespace.shift(),
      formParam = root;

    while (namespace.length) {
      formParam += `[${namespace.shift()}]`;
    }
    return {param: formParam, msg: msg, value: value};
  }
}));

app.use(flash());

app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

app.use('/Admin', adminRouter);
app.use('/Auth', authRouter);

app.get('/', (req, res) => {
  res.render('index');
});


// app.get('/signUp', (req, res) => {
// 	res.render('signup');
// });

app.post('/send', sendMail);
app.post('/news', (req, res) => {
  addEmailToMailChimp(req.body.email);
  console.log('MailChimp success');
  return res.render('index');
});

app.get('*', (req,res) => {
    res.redirect('/');
});

app.listen(port, err => {
  console.log(`running server on ${port}`);
});
