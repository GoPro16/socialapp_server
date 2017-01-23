var express = require('express');
var router = express.Router();

//Models 
var UserMethods = require("../controllers/userController.js"),
	CommentMethods = require("../controllers/commentController.js"),
	PostMethods = require("../controllers/postController.js"),
	ConnectionMethods = require("../controllers/connectionController.js");

//Middleware for sending token to user
var Auth = require('../middleware/auth.js');

//Requires that all routes validate their request
router.all('/api/v1/*',require('../middleware/validateRequest.js'));

/* ==================== API ENDPOINTS ====================== */
//Login doesn't require validation
router.post("/login",Auth.login);
//creates a new user
router.post("/api/users",UserMethods.createUser);

//posts for a user
router.get("/api/v1/users/:userid/posts",PostMethods.getPosts);
router.post("/api/v1/users/:userid/posts",PostMethods.createPost);

//gets the comments for a post of a user
router.get("/api/v1/users/:userid/posts/:postid/comments",CommentMethods.getComments);
router.post("/api/v1/users/:userid/posts/:postid/comments",CommentMethods.createComment);

//get the followers and following of a user
router.get("/api/v1/users/:userid/followers",ConnectionMethods.getFollowers);
router.get("/api/v1/users/:userid/following",ConnectionMethods.getFollowing);
router.post("/api/v1/users/:userid/follow",ConnectionMethods.addConnection);

//Gets all users(requires admin validation)
router.get("/api/v1/users",UserMethods.getUsers);

//Checks if a user exists/valid
router.get("/api/users/check",UserMethods.checkUser);

//======================================
module.exports = router;
