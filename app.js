// Import all necessary files

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var express = require('express');
var mongo = require('mongodb');
var mongoose = require('mongoose');
var passport = require('passport');
var path = require('path');
var session = require('express-session');

// Initialize express, port, and mongoose

var app = express();
var port = process.env.PORT || 3000;
mongoose.connect('mongodb://admin:the_machine@ds034807.mlab.com:34807/the-machine');

// Routes

var adminRouter = require('./src/routes/adminRoutes');
var authRouter = require('./src/routes/authRoutes');

// Express code

app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use(cookieParser());
app.use(express.static('public'));
app.use(session({
	secret: 'machine_la ',
	resave: true,
	saveUninitialized: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(passport.initialize());
app.use(passport.session());


app.use('/Admin', adminRouter);
app.use('/Auth', authRouter);

app.get('/', function(req, res) {
  res.render('index');
});

app.listen(port, function(err) {
  console.log('running server on ' + port);
});
