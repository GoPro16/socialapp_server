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
	Post.findAll({where:{username:req.headers.x_username}}).then(function(posts){
		post.forEach(function(post){
			posts.pop(post);
			post.content = getContent(post.id);
			post.media = getMedia(post.id);
			post.comments = getComments(post.id);
			post.stars = getStars(post.id);
			posts.push(post);
		});//end for each
		res.send(posts);
	});//end query	
};

module.exports.getOnePost = function(req,res){
	Post.findAll({where:{username:req.params.username,id:req.params.id}}).then(function(post){
		post.content = getContent(post.id);
		post.media = getMedia(post.id);
		post.comments = getComments(post.id);
		post.stars = getStars(post.id);
		res.send(post);
	});//end query	
};


module.exports.createPost = function(req,res){
	var newPost = {
		time: Date.now(),
		username: req.headers.x_username
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
		getOnePost({
			req:{
				params:{
					username:post.author,
					id:post.id
				}
			}
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

module.exports.getStars = function(post){
	models.Star.findAll({where:{post:post}}).then(function(stars){
		return stars;
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


//@Not working yet
module.exports.toggleStar = function(post,user){
	return post;
};