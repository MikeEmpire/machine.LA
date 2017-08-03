var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var session = require('express-session');

var app = express();

var port = process.env.PORT || 5000;
var nav = [
  {
    Link: '/Books',
    Text: 'Book'
  }, {
    Link: '/Authors',
    Text: 'Author'
  }
];

app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use(cookieParser());
app.use(express.static('public'));
app.use(session({secret: 'machine_la ', resave: true, saveUninitialized: true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

require('./src/config/passport')(app);

var adminRouter = require('./src/routes/adminRoutes')(nav);
var authRouter = require('./src/routes/authRoutes')(nav);

app.use('/Admin', adminRouter);
app.use('/Auth', authRouter);

app.get('/', function(req, res) {
  res.render('index', {
    title: 'Hello from render',
    nav: [
      {
        Link: '/Books',
        Text: 'Book'
      }, {
        Link: '/Authors',
        Text: 'Author'
      }
    ]
  });
});

app.listen(port, function(err) {
  console.log('running server on ' + port);
});
