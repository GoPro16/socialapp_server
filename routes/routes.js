var express = require('express');
var router = express.Router();

var UserMethods = require("../controllers/userController.js"),
	CommentMethods = require("../controllers/commentController.js"),
	PostMethods = require("../controllers/postController.js"),
	FollowMethods = require("../controllers/followController.js");


/* ==================== API ENDPOINTS ====================== */
router.get("/api/users/:id/posts",PostMethods.getPosts);
router.post("/api/users/:id/posts",PostMethods.createPost);

router.get("/api/users/:id/posts/:id/comments",CommentMethods.getComments);
router.post("/api/users/:id/posts/:id/comments",CommentMethods.createComment);

router.get("/api/users/:id/followers",FollowMethods.getFollowers);
router.get("/api/users/:id/following",FollowMethods.getFollowing);
router.post("/api/users/:id/follow",FollowMethods.addFollow);

router.post("/api/users",UserMethods.createUser);
router.get("/api/users",UserMethods.getUsers);



var models = require('../database/models');

/* ====================== WEB ENDPOINTS ====================== */
router.get("/",function(req,res){
	models.User.findAll({}).then(function(users){
		models.Post.findAll({}).then(function(posts){
			models.Comment.findAll({}).then(function(comments){
				var postCount;
				var commentCount;
				users.forEach(function(user){
					postCount = 0;
					commentCount = 0;
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
					users:users,
					posts:posts,
					comments:comments
				});
			});
		});
	});
});
router.post("/user",function(req,res){
	models.User.create({
		username : req.body.username,
		hash : req.body.hash
	}).spread(function(user,create){
		if(create){
		}
		res.redirect("/");
	}).catch(function(err){
		res.send(err);
	});
});


router.post("/post",function(req,res){
	models.Post.create({
		content: req.body.content,
		time: Date.now(),
		user : req.body.userid
	}).spread(function(post,create){
		if(create){
		}
		res.redirect("/");
	}).catch(function(err){
		res.send(err);
	});
});

router.post("/comment",function(req,res){
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
		res.send(err);
	});
});

router.post("/delete",function(req,res){
	console.log(req.body.id);
	models.User.findAll({where:{id:req.body.id}}).then(function(user){
		models.Post.destroy({where:{user:user.id}}).then(function(rowDeleted){
			console.log('success delete posts');
		});
		models.Comment.destroy({where:{user:user.id}}).then(function(commentDeleted){
			console.log('success dlete comment');
		});
		models.User.destroy({where:{id: req.body.id}}).then(function(deletedUser){
			console.log('user delted');
		});

		res.redirect("/");
	});
});

//======================================
module.exports = router;