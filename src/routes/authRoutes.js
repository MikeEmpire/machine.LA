var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/users');

router.post('/signUp', function(req,res) {
    console.log(User);
  var username = req.body.username;
  var password = req.body.password;

  req.checkBody('username', 'Username is required').notEmpty();
  req.checkBody('password', 'Password is required').notEmpty();

  var errors = req.validationErrors();

  if(errors) {
    res.redirect('/signup');
    console.log(errors);
  } else {
      var newUser = new User({
        username: username,
        password: password
    });
      console.log("get User By Username");
    User.getUserByUsername(username, function(err, user) {
        if(err) throw err;
        if(!user) {
            User.createUser(newUser, function(err, user) {
                if(err) throw err;
                console.log(user);
            });
            console.log("no user");
            res.redirect('/admin');
        } else {
            res.redirect('/signUp');
        }
    });
  }
});

passport.use(new LocalStrategy(
    function(username, password, done) {
        User.getUserByUsername(username, function(err, user) {
            if(err) throw err;
            if(!user) {
                return done(null, false, {message: 'Unknown User'});
            }

            User.comparePassword(password, user.password, function(err, isMatch) {
                if(err) throw err;
                if(isMatch) {
                    return done(null, user);
                } else {
                    return done(null, false, {message: 'Invalid password'});
                }
            })
        });
    }));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.getUserById(id, function(err, user) {
        done(err, user);
    });
});

function usernameToLowerCase(req, res, next) {
    req.body.username = req.body.username.toLowerCase();
    next();
}

router.post('/login', usernameToLowerCase,
    passport.authenticate('local', {successRedirect: '/admin/profile', failureRedirect: '/admin/'}),
    function(req, res) {
        res.redirect('/admin/profile');
    });

router.get('/logout', function(req, res) {
   req.logout();

   res.redirect('/');
});

module.exports = router;