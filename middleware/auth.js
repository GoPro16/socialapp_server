var jwt = require('jwt-simple');
var secret = require('../keys/apiKey');
var UserMethods = require('../controllers/userController.js');


var Auth = {
    login: function(req, res) {
      var username = req.body.username || '';
      var password = req.body.password || '';
      console.log('login auth', username, password);
      if (username == '' || password == '') {
        res.status(401);
        res.json({
          "status": 401,
          "message": "Invalid credentials"
        });
        return;
      }
      // Check if username and password credentials are valid
      Auth.validate(username, password).then(function(dbUserObj){
        if (dbUserObj.error) { // If failed send 401
          res.status(401);
          res.json({
            "status": 401,
            "message": dbUserObj.error
          });
          return;
        }
        if (dbUserObj) {
          //success -> generate and token and send to client
          res.send(genToken(dbUserObj));
        }
      });
    },
    validate: function(username, password) {
      // spoofing the DB response for simplicity
      return UserMethods.checkPassword(username, password);
    },
    validateUser: function(username) {
      return UserMethods.validateUsername(username);
    },
  }
  // private method
function genToken(user) {
  var expires = expiresIn(7); // 7 days
  var token = jwt.encode({
    exp: expires
  }, secret());
  return {
    token: token,
    expires: expires,
    user: user
  };
}

function expiresIn(numDays) {
  var dateObj = new Date();
  return dateObj.setDate(dateObj.getDate() + numDays);
}
module.exports = Auth;
