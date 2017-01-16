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
	var newFollower = {
		 follower : req.body.currentuserid,
		 following: req.body.otheruserid
	};
	Follow.create(newFollower).spread(function(follower,create){
		if(create){
		}
		res.send(follower);
	}).catch(function(err){
		res.send(err);
	});
};