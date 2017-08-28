var express = require('express');
var adminRouter = express.Router();

adminRouter.get('/', ensureAuthenticated, function(req, res) {
  res.redirect('/admin/profile');
});

adminRouter.get('/profile', ensureAuthenticated, function(req, res) {
  res.render('admin');
});

function ensureAuthenticated(req, res, next) {
  if(req.isAuthenticated()) {
    return next();
  } else {
    res.render('signIn');
  }
}

module.exports = adminRouter;
