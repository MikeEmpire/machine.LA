var express = require('express');
var adminRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
var passport = require('passport');

var router = function(nav) {
  adminRouter.route('/')
      .post(passport.authenticate('local', {
        // if login credentials don't correspond
        failureRedirect: '/admin'
      }), function(req, res) {
      // if login credentials properly correspond
      res.redirect('/admin/profile');
      })
      .get(function(req, res) {
        res.render('signIn');
      });

  adminRouter.route('/profile')
      .get(function(req, res) {
        var url = 'mongodb://admin:the_machine@ds034807.mlab.com:34807/the-machine';
        res.render('admin', {
          username: req.user.username,
          password: req.user.password
        });
      });

  adminRouter.route('/profile/about')
      .get(function(req, res) {
        res.render('editabout')
      });
  // adminRouter.route('/signUp')
  //     .post(function(req, res) {
  //       var url = 'mongodb://admin:the_machine@ds034807.mlab.com:34807/the-machine';
  //       mongodb.connect(url, function(err, db) {
  //         var collection = db.collection('users');
  //         var user = {
  //           username: req.body.userName,
  //           password: req.body.password
  //         };
  //         collection.insert(user, function(err, results) {
  //           if (err) {console.log(err);}
  //           req.login(results.ops[0], function() {
  //             res.redirect('/auth/profile');
  //           });
  //         });
  //       });
  //     });
  return adminRouter;
};
module.exports = router;
