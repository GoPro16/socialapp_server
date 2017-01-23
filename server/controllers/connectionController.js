var models = require('../database/models');
var Connection = models.Connection;

var sendResponse = function(res, query){
  	Follow.findAll(query).then(function(follows){
    if(routes.length){
      res.send(follows);
    }else{
      res.send({error: 'error no user found'});
    }
  });
};

module.exports.getFollowers = function(req,res){
	Connection.findAll({where:{following:req.params.user.id}}).then(function(followers){
		res.send(followers);
	});	
};

module.exports.getFollowing = function(req,res){
	Connection.findAll({where:{user:req.params.user.id}}).then(function(following){
		res.send(following);
	});	
};


module.exports.addConnection = function(req,res){
	Connection.findAll({where:{
		following:req.body.following,
		follower:req.body.follower
	}}).then(function(follower){
		if(follower){
			res.send(follower);
		}else{
			var newConnection = {
		 	user : req.body.user,
		 	following: req.body.following
			};
			Connection.create(newFollower).spread(function(follower,create){
			if(create){
			}
			res.send(newFollower);
			}).catch(function(err){
				res.send(err);
			});
		}
	});
};