var models = require('../database/models');
var Post = models.Post;
var async = require('async');

var Db = {
	getMedia: function(post,callback){
		models.Media.find({where:{post:post}}).then(function(media){
			if(media){
				callback(media.link);
			}else{
				callback("");
			}
		});
	},
	getContent: function(post,callback){
		models.Content.find({where:{post:post}}).then(function(newContent){
			if(newContent){
				callback(newContent.content);
			}else{
				callback("");
			}
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
		async.each(posts,function(post){
			Db.getContent(post.id,function(content){
				Db.getMedia(post.id,function(media){
					post.content = content;
					post.media = media;
					console.log('UPDATED POST');
				});//get media
			});//get content
		},function(err){
			if(err){
				console.log('ASYNC FOREACH ERROR: '+err);
			}else{
				console.log('RES SENDING THE NEW POSTSSS@!@@@@@@');
				res.send(posts);
			}
		});//end for each
	});//end query	
};

module.exports.getOnePost = function(req,res){
	Post.find({where:{username:req.headers.x_username,id:req.headers.id}}).then(function(foundPost){
		Db.getContent(req.headers.id,function(content){
			Db.getMedia(req.headers.id,function(media){
				res.send({
					post:{
						id:foundPost.id,
						time:foundPost.time,
						username:foundPost.username,
						content: content,
						media:media
					}
				});
			});
		});
		//post.comments = Db.getComments(parseInt(req.headers.id));
		//post.stars = Db.getStars(post.id);
	});//end query	
};


module.exports.createPost = function(req,res){
	Post.create({time:Date.now(),username:req.headers.x_username}).then(function(post,create){
		if(req.body.media != null){
			Db.addMedia(post.id,req.body.media);
		}
		if(req.body.content != null){
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
