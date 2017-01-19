var models = require('../database/models');
var bcrypt = require('bcrypt-nodejs');
var User = models.User;

var sendResponse = function(res, query){
  	User.findAll(query).then(function(users){
    if(users.length){
      res.send(users);
    }else{
      res.send({error: 'error no user found'});
    }
  });
};

module.exports.getUsers = function(req,res){
	User.findAll({}).then(function(users){
		res.send(users);
	});	
};

module.exports.checkUser = function(req, res){
  var userData = req.params;
  var options = {
    where: {
      $or: {
        username:userData.username
      }
    }
  };
  Users.findAll(options).spread(function(user) {
    if (user) {
      let error = 'unknown error';
      if (user.username === userData.username) {
        error = 'username exists already'
      }
      res.send({error})
    } else {
      res.send({success: 'User available'})
    }
  }).catch(function(err){
    res.send(err);
  });
};


module.exports.createUser = function(req,res){
	var newUser = {
		username : req.body.username,
		hash : req.body.hash
	};
	User.create(newUser).spread(function(user,create){
		if(create){
		}
		res.send(user);
	}).catch(function(err){
		res.send(err);
	});
};

module.exports.validateUsername = function(username){
  var query = {
    where: {username: username},
    raw: true,
  };
  return User.findAll(query).spread(function(user){
    if(user){
      return user;
    }else {
      return{error: 'Invalid Username'};
    }
  })
  .catch(function(err){
    return {error: err};
  })
};


module.exports.checkPassword = function(username, password){
  return User.findAll({where: {username: username},raw: true}).spread(function(user){
      if(user){
        var verified = bcrypt.compareSync(password, user.hash);
        if(verified){
          return user;
        }else{
          return{error: 'Username or Password Invalid!'};
        }
      }else{
        return{error: 'Username or Password Invalid!'};
      }
    })
    .catch(function(err){
      return {error: err};
    })
};
