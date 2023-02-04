const express = require("express");
const router = express.Router();
const postControllers = require("../controllers/postControllers");

router
  .route("/")
  .get(postControllers.getPosts)
  .post(postControllers.addPost)
  .patch(postControllers.updatePost)
  .delete(postControllers.deletePost);

module.exports = router;
