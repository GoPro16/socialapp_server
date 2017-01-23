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
	Post.findAll({where:{user:req.params.userid}}).then(function(posts){
		post.forEach(function(post){
			posts.pop(post);
			post.content = getContent(post.id);
			post.media = getContent(post.id);
			post.comments = getContent(post.id);
			post.push(post);
		});//end for each
		res.send(posts);
	});//end query	
};


module.exports.createPost = function(req,res){
	var newPost = {
		time: Date.now(),
		author: req.body.user.id
	};
	Post.create(newPost).spread(function(post,create){
		var media;
		var content;
		if(create){
		}
		if(req.body.media){
			media = addMedia(post,req.body.media);
		}
		if(req.body.content){
			content = addContent(post,req.body.content);
		}
		res.send({
			post:post,
			media:media,
			content:content
		});
	}).catch(function(err){
		res.send(err);
	});
};

// =============== GETS ALL CONTENT,MEDIA,COMMENTS WITH EACH POST ============ //
module.exports.getMedia = function(post){
	models.Media.findAll({where:{post:post}}).then(function(media){
		return media;
	});
};

module.exports.getContent = function(post){
	models.Content.findAll({where:{post:post}}).then(function(content){
		return content;
	});
};

module.exports.getComments = function(post){
	models.Comment.findAll({where:{post:post}}).then(function(comments){
		return comments;
	});
};


// =================================== END =================================== //


module.exports.addMedia = function(post,media){
	models.Media.create({link:media,post:post.id}).spread(function(newMedia,create){
		if(create){
		}
		return;
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