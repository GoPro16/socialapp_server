var models = require('../database/models');
var Follow = models.Follow;

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
	Follow.findAll({where:{following:req.params.userid}}).then(function(followers){
		res.send(followers);
	});	
};

module.exports.getFollowing = function(req,res){
	Follow.findAll({where:{follower:req.params.userid}}).then(function(following){
		res.send(following);
	});	
};


module.exports.addFollow = function(req,res){
	models.Follow.findAll({where:{
		following:req.body.following,
		follower:req.body.follower
	}}).then(function(follower){
		if(follower){
			res.send(follower);
		}else{
			var newFollower = {
		 	follower : req.body.follower,
		 	following: req.body.following
			};
			models.Follow.create(newFollower).spread(function(follower,create){
			if(create){
			}
			res.send(newFollower)
			}).catch(function(err){
				res.send(err);
			});
		}
	});
};