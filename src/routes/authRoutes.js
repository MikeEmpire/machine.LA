var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/users');

router.post('/signUp', function(req,res) {
  var username = req.body.userName;
  var password = req.body.password;

  var newUser = new User({
      name: name,
      email: email,
  });
  User.getUserByUsername(username, function(err, user) {
      if(err) throw err;
      if(!user) {
          User.createUser(newUser, function(err, user) {
              if(err) throw err;
              console.log(user);
          });

          res.redirect('/admin');
      } else {
          console.log('fail');
      }
  });
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