const express = require("express");
const router = express.Router();
const postControllers = require("../controllers/postControllers");
const verifyJWT = require("../middleware/verifyJWT");
router.use(verifyJWT);

router
  .route("/")
  .get(postControllers.getPosts)
  .post(postControllers.addPost)
  .patch(postControllers.updatePost)
  .delete(postControllers.deletePost);

module.exports = router;
