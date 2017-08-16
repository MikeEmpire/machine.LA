var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var session = require('express-session');

var app = express();

var port = process.env.PORT || 3000;

app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use(cookieParser());
app.use(express.static('public'));
app.use(session({secret: 'machine_la ', resave: true, saveUninitialized: true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

require('./src/config/passport')(app);

var adminRouter = require('./src/routes/adminRoutes');
var authRouter = require('./src/routes/authRoutes');

app.use('/Admin', adminRouter);
app.use('/Auth', authRouter);

app.get('/', function(req, res) {
  res.render('index');
});

app.listen(port, function(err) {
  console.log('running server on ' + port);
});
