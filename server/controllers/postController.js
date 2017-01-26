var models = require('../database/models');
var Post = models.Post;


var Db = {
	getMedia: function(post){
		models.Media.findAll({where:{post:post}}).then(function(media){
			return media;
		});
	},
	getContent: function(post){
		models.Content.findAll({where:{post:post}}).then(function(newContent){
			console.log('content: '+newContent.content);
			return newContent;
		});
	},
	getComments: function(post){
		models.Comment.findAll({where:{post:post}}).then(function(comments){
			return comments;
		});
	},
	getStars: function(post){
		models.Star.findAll({where:{post:post}}).then(function(stars){
			return stars;
		});
	},
	addMedia: function(post,media){
		if(media){
			models.Media.create({link:media,post:post}).then(function(newMedia,create){
			if(create){
			}
			return;
		}).catch(function(err){
			console.log('media add error:'+err);
			return err;
		});
		}
	},
	addContent: function(post,content){
		if(content){
			models.Content.create({content:content,post:post}).then(function(newContent,create){
			if(create){
			}
			return;
		}).catch(function(err){
			console.log('Content add error:'+err);
			return err;
		});
		}
	},//@Not working yet
	toggleStar: function(post,user){
		return post;
	},
  };

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
		var newPosts = [];

		posts.forEach(function(post){
		var cont =  Db.getContent(post.id);
		var med = Db.getMedia(post.id);
		var com = Db.getComments(post.id);

			var newPost = {
				id: post.id,
				username: post.username,
				time:post.time,
				content: cont,
				media: med,
				comments: com
			};
			//post.stars = Db.getStars(post.id);
			newPosts.push(newPost);
		});//end for each
		res.send(newPosts);
	});//end query	
};

module.exports.getOnePost = function(req,res){
	Post.findAll({where:{username:req.params.username,id:req.params.id}}).then(function(post){
		post.content = Db.getContent(post.id);
		post.media = Db.getMedia(post.id);
		post.comments = Db.getComments(post.id);
		//post.stars = Db.getStars(post.id);
		res.send(post);
	});//end query	
};


module.exports.createPost = function(req,res){
	Post.create({time:Date.now(),username:req.headers.x_username}).then(function(post,create){
		console.log('Post id:' + post.id+'media:'+req.body.media);
		if(req.body.media){
			Db.addMedia(post.id,req.body.media);
		}
		if(req.body.content){
			Db.addContent(post.id,req.body.content);
		}
		res.send({
			newPost:{
				id:post.id,
				username:post.username,
				time:post.time,
				media:req.body.media,
				content:req.body.content
			}
		});
		
	}).catch(function(err){
		res.send('Error:'+ err);
	});
};

// =============== GETS ALL CONTENT,MEDIA,COMMENTS WITH EACH POST ============ //






// =================================== END =================================== //
