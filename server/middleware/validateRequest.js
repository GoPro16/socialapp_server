var jwt = require('jwt-simple');
var validateUser = require('../middleware/auth').validateUser;
var secret = require('../keys/apiKey');

module.exports = function(req, res, next) {
  // When performing a cross domain request, you will recieve
  // a preflighted request first. This is to check if tha app is safe
  // We skip the token outh for [OPTIONS] requests.
  //if(req.method == 'OPTIONS') next();
  var token = (req.params && req.params.access_token) || (req.query && req.query.access_token) || req.headers.x_token;
  var key = (req.params && req.params.x_key) || (req.query && req.query.x_key) || req.headers.x_username;
  if (token || key) {
    try {
      var decoded = jwt.decode(token, secret());
      if (decoded.exp <= Date.now()) {
        res.status(400);
        res.json({
          "status": 400,
          "message": "Token Expired"
        });
        return;
      }
      // Authorize the user to see if s/he can access our resources
      // The key would be the logged in user's username
      validateUser(key).then(function(dbUser){
        if (dbUser) {
          if (true) {//Always authorized unless we decide to put check for admins only
            console.log('Successfully validated User');
            next(); // To move to next middleware
          } else {
            res.status(403);
            res.json({
              "status": 403,
              "message": "Not Authorized"
            });
            return;
          }
        } else {
          // No user with this name exists, respond back with a 401
          res.status(401);
          res.json({
            "status": 401,
            "message": "Invalid User"
          });
          return;
        }
      });
    } catch (err) {
      res.status(500);
      res.json({
        "status": 500,
        "message": "Oops something went wrong",
        "error": err
      });
    }
  } else {
    res.status(401);
    res.json({
      "status": 401,
      "message": "Invalid Token or Key"
    });
    return;
  }
};
