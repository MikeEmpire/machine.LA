// Import all necessary files

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var express = require('express');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var mongo = require('mongodb');
var mongoose = require('mongoose');
var passport = require('passport');
var path = require('path');
var session = require('express-session');

var keys = require('./config/keys');

// Initialize express, port, and mongoose

var app = express();
var port = process.env.PORT || 3000;
mongoose.connect(keys.mongoURI);

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

// Validator
app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.'),
            root = namespace.shift(),
            formParam = root;

        while(namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param: formParam,
            msg: msg,
            value: value
        };
    }
}));

app.use(flash());

app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});

app.use('/Admin', adminRouter);
app.use('/Auth', authRouter);

app.get('/', function(req, res) {
  res.render('index');
});

app.get('/signUp', function(req, res) {
	res.render('signup');
})

app.listen(port, function(err) {
  console.log('running server on ' + port);
});
