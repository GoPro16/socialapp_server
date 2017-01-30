var models = require('../database/models');
var Post = models.Post;
var Content = models.Content;

var async = require('async');
var _ = require('underscore');
var Db = {
	addMedia: function(post,media){
		if(media){
			models.Media.create({link:media,PostId:post}).then(function(newMedia,create){
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
			models.Content.create({content:content,PostId:post}).then(function(newContent,create){
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
	Post.findAll({
		where:{UserUsername:req.headers.x_username},
		include:[
		{model:Content},
		{model:models.Media},
		{model:models.Comment},
		{model:models.Star}
		]
		}).then(function(posts){
		res.send(posts);
	});//end query	
};

module.exports.toggleStar = function(req,res){
	models.Star.findOrCreate({where:{UserUsername:req.headers.x_username,PostId:req.headers.id}}).spread(function(star,create){
		if(create){
			console.log('\nCREATED STAR!\n');
			res.send('created');
		}else{
			console.log('\nDELETED STAR!\n');
			star.destroy();
			res.send('destroyed');
		}
	}).catch(function(err){
		res.send('Error'+err);
	});//end query	
};

module.exports.getOnePost = function(req,res){
	Post.find({where:{id:req.headers.id},
		include:[
		{model:Content},
		{model:models.Media},
		{model:models.Comment},
		{model:models.Star}
		]}).then(function(foundPost){
		res.send(foundPost);
	});//end query	
};
module.exports.createPost = function(req,res){
	Post.create({time:Date.now(),UserUsername:req.headers.x_username}).then(function(post,create){
		if(req.body.media != null){
			Db.addMedia(post.id,req.body.media);
		}
		if(req.body.content != null){
			Db.addContent(post.id,req.body.content);
		}
		res.send({
			newPost:{
				id:post.id,
				username:post.UserUsername,
				time:post.time,
				media:req.body.media,
				content:req.body.content,
				comments: [],
				stars: 0
			}
		});
		
	}).catch(function(err){
		res.send('Error:'+ err);
	});
};

// =============== GETS ALL CONTENT,MEDIA,COMMENTS WITH EACH POST ============ //






// =================================== END =================================== //
