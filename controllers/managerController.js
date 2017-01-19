var models = require('../database/models');
var bcrypt = require('bcrypt-nodejs');

module.exports.renderPage = function(req,res){
	models.User.findAll({}).then(function(users){
		models.Post.findAll({}).then(function(posts){
			models.Comment.findAll({}).then(function(comments){
				models.Follow.findAll({}).then(function(follows){
					var postCount;
					var commentCount;
					var followerCount;
					var followCount;
					users.forEach(function(user){
						postCount = 0;
						commentCount = 0;
						followerCount = 0;
						followCount = 0;
						follows.forEach(function(follow){
							if(user.id == follow.follower){
								followCount++;
							}
							if(user.id == follow.following){
								followerCount++;
							}
							user.followerCount = followerCount;
							user.followCount = followCount;
						});

						posts.forEach(function(post){
							if(user.id == post.user){
								postCount++;
							}
							user.postCount = postCount;
						});

						comments.forEach(function(comment){
							if(user.id == comment.user){
								commentCount++;
							}
							user.commentCount = commentCount;
						});
					});
					res.render('home',{
						users:users
					});
				});
			});
		});
	});
};


module.exports.createUser = function(req,res){
	models.User.create({
		username : req.body.username,
		hash : req.body.hash
	}).spread(function(user,create){
		if(create){
		}
		res.redirect("/");
	}).catch(function(err){
		res.redirect("/");
	});
};

module.exports.addFollow = function(req,res){
	models.Follow.findAll({where:{
		following:req.body.following,
		follower:req.body.follower
	}}).then(function(follower){
		if(follower){
			console.log('follower exists');
			res.redirect("/");
		}else{
			var newFollower = {
		 	follower : req.body.follower,
		 	following: req.body.following
			};
			models.Follow.create(newFollower).spread(function(follower,create){
			if(create){
			}
			res.redirect("/");
			}).catch(function(err){
				res.redirect("/");
			});
		}
	});
};


module.exports.createPost = function(req,res){
	models.Post.create({
		content: req.body.content,
		time: Date.now(),
		user : req.body.userid
	}).spread(function(post,create){
		if(create){
		}
		res.redirect("/");
	}).catch(function(err){
		res.redirect("/");
	});
};

module.exports.createComment = function(req,res){
	console.log(req.body);
	models.Comment.create({
		content: req.body.content,
		user: req.body.userid,
		post: req.body.postid,
		time: Date.now()
	}).spread(function(comment,create){
		if(create){
		}
		res.redirect("/");
	}).catch(function(err){
		res.redirect("/");
	});
};


module.exports.deleteUser = function(req,res){
	console.log(req.body.id);
	models.User.findAll({where:{id:req.body.id}}).then(function(user){
		models.Post.destroy({where:{user:req.body.id}}).then(function(rowDeleted){
			console.log('success deleted posts');
		});
		models.Comment.destroy({where:{user:req.body.id}}).then(function(commentDeleted){
			console.log('success deleted comments');
		});
		models.Follow.destory({where:{following:req.body.id}}).then(function(deletedFollowing){
			console.log('deleted followers')
		});
		models.Follow.destory({where:{follower:req.body.id}}).then(function(deletedFollowing){
			console.log('deleted following')
		});
		models.User.destroy({where:{id: req.body.id}}).then(function(deletedUser){
			console.log('user deleted user');
		});

		res.redirect("/");
	});
};









