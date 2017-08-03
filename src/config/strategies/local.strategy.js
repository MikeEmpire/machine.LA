var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongodb = require('mongodb').MongoClient;

module.exports = function() {
  passport.use(new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password'
  },
  function(username, password, done){
    var url = 'mongodb://admin:the_machine@ds034807.mlab.com:34807/the-machine';
    mongodb.connect(url, function(err, db){
      var collection = db.collection('users');
      collection.findOne({
        username: username,
        password: password
      },
      function(err, results) {
          if (results.password === password){
              var user = results;
              console.log(user);
              done(null, user);
          } else {
              done(null, false, {message: 'Bad password'});
          }
      });
    });
    var user = {
      username: username,
      password: password
    };
    done(null, user);
  }));
};
