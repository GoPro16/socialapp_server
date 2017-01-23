var models = require('../database/models');
var Comment = models.Comment;


var sendResponse = function(res, query){
  	Comment.findAll(query).then(function(comments){
    if(comments.length){
      res.send(comments);
    }else{
      res.send({error: 'error no user found'});
    }
  });
};

//Only works if we get the post id
module.exports.getComments = function(req,res){
	Comment.findAll({where:
		{
			user:req.params.userid,
			post:req.params.postid
		}
	}).then(function(comments){
		res.send(comments);
	});	
};


module.exports.createComment = function(req,res){
	var newComment = {
		post: req.body.post.id,
		content: req.body.content,
		time: Date.now()
	};
	Comment.create(newComment).spread(function(comment,create){
		if(create){
		}
		res.send({comment});
	}).catch(function(err){
		res.send(err);
	});
};


module.exports.addContent = function(post,content){
	models.Content.create({content:content,post:post.id}).spread(function(newPost,create){
		if(create){
		}
		return;
	}).catch(function(err){
		res.send(err);
	});
};