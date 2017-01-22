var express = require('express');
var router = express.Router();

//Models 
var UserMethods = require("../controllers/userController.js"),
	CommentMethods = require("../controllers/commentController.js"),
	PostMethods = require("../controllers/postController.js"),
	FollowMethods = require("../controllers/followController.js"),
	ConsoleMethods = require("../controllers/managerController.js");

//Middleware for sending token to user
var Auth = require('../middleware/auth.js');

//Requires that all routes validate their request
router.all('/api/v1/*',require('../middleware/ValidateRequest.js'));

/* ==================== API ENDPOINTS ====================== */
router.post("/login",Auth.login);

router.get("/api/v1/users/:userid/posts",PostMethods.getPosts);
router.post("/api/v1/users/:userid/posts",PostMethods.createPost);

router.get("/api/v1/users/:userid/posts/:postid/comments",CommentMethods.getComments);
router.post("/api/v1/users/:userid/posts/:postid/comments",CommentMethods.createComment);

router.get("/api/v1/users/:userid/followers",FollowMethods.getFollowers);
router.get("/api/v1/users/:userid/following",FollowMethods.getFollowing);
router.post("/api/v1/users/:userid/follow",FollowMethods.addFollow);

router.post("/api/users",UserMethods.createUser);
router.get("/api/v1/users",UserMethods.getUsers);
router.get("/api/users/check",UserMethods.checkUser);

var models = require('../database/models');

/* ====================== WEB ENDPOINTS ====================== */
//Eventually all will be react 

router.get("/",ConsoleMethods.renderPage);

router.post("/user",ConsoleMethods.createUser);

router.post("/post",ConsoleMethods.createPost);

router.post("/comment",ConsoleMethods.createComment);

router.post("/delete",ConsoleMethods.deleteUser);

router.post("/follow",ConsoleMethods.addFollow);

router.get("/feed",function(req,res){
	res.render('feed');
});

//======================================
module.exports = router;
