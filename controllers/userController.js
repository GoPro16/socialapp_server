var models = require('../database/models');
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