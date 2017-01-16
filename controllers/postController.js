var models = require('../database/models');
var Post = models.Post;




var sendResponse = function(res, query){
  	Post.findAll(query).then(function(posts){
    if(posts.length){
      res.send(posts);
    }else{
      res.send({error: 'error no user found'});
    }
  });
};

module.exports.getPosts = function(req,res){
	Post.findAll({}).then(function(posts){
		res.send(posts);
	});	
};


module.exports.createPost = function(req,res){
	var newPost = {
		content:req.body.content,
		time: Date.now(),
		user: req.body.userid
	};
	Post.create(newPost).spread(function(post,create){
		if(create){
		}
		res.send({post});
	}).catch(function(err){
		res.send(err);
	});
};