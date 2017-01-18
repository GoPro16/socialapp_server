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


/* ==================== API ENDPOINTS ====================== */
router.post("/login",Auth.login);

router.get("/api/users/:userid/posts",PostMethods.getPosts);
router.post("/api/users/:userid/posts",PostMethods.createPost);

router.get("/api/users/:userid/posts/:postid/comments",CommentMethods.getComments);
router.post("/api/users/:userid/posts/:postid/comments",CommentMethods.createComment);

router.get("/api/users/:userid/followers",FollowMethods.getFollowers);
router.get("/api/users/:userid/following",FollowMethods.getFollowing);
router.post("/api/users/:userid/follow",FollowMethods.addFollow);

router.post("/api/users",UserMethods.createUser);
router.get("/api/users",UserMethods.getUsers);



var models = require('../database/models');

/* ====================== WEB ENDPOINTS ====================== */
router.get("/",ConsoleMethods.renderPage);

router.post("/user",ConsoleMethods.createUser);

router.post("/post",ConsoleMethods.createPost);

router.post("/comment",ConsoleMethods.createComment);

router.post("/delete",ConsoleMethods.deleteUser);

//======================================
module.exports = router;
