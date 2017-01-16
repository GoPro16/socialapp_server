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
	Comment.findAll({}).then(function(comments){
		res.send(comments);
	});	
};


module.exports.createComment = function(req,res){
	var newComment = {
		content: req.body.content,
		user: req.body.userid,
		post: req.body.postid,
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