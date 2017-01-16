var express = require('express');
var router = express.Router();

var UserMethods = require("../controllers/userController.js"),
	CommentMethods = require("../controllers/commentController.js"),
	PostMethods = require("../controllers/postController.js"),
	FollowMethods = require("../controllers/followController.js");


/* ==================== POST ENDPOINTS ====================== */
router.get("/api/users/:id/posts",PostMethods.getPosts);
router.post("/api/users/:id/posts",PostMethods.createPost);

router.get("/api/users/:id/posts/:id/comments",CommentMethods.getComments);
router.post("/api/users/:id/posts/:id/comments",CommentMethods.createComment);

router.get("/api/users/:id/followers",FollowMethods.getFollowers);
router.get("/api/users/:id/following",FollowMethods.getFollowing);
router.post("/api/users/:id/follow",FollowMethods.addFollow);

router.post("/api/users",UserMethods.createUser);
router.get("/api/users",UserMethods.getUsers);





/* ======================CREATING ROUTE TASKS ====================== */

//======================================
module.exports = router;