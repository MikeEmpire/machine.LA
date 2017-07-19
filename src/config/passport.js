var passport = require('passport');
var LocalStrategy   = require('passport-local').Strategy;

module.exports = function(app) {
  app.use(passport.initialize());
  app.use(passport.session());
  // used to bundle user into a session
  passport.serializeUser(function(user, done){
    done(null, user);
  });
  // unbundle user out of database
  passport.deserializeUser(function(user, done){
    done(null, user);
  });
  // require a config with passport strategies
  require('./strategies/local.strategy')();
};
