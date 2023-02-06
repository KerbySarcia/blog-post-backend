const Post = require("../models/Post");

//@desc get all posts
//@route GET /posts
//@access PRIVATE
const getPosts = async (req, res) => {
  const posts = await Post.find().lean();
  if (!posts?.length)
    return res.status(400).json({ message: "Posts Collection is Empty" });

  res.json(posts);
};

//@desc add post
//@route POST /posts
//@access PRIVATE
const addPost = async (req, res) => {
  const { title, body, user, time } = req.body;
  if (!title || !body)
    return res.status(400).json({ message: "Title and Body are required" });

  // add post
  const result = await Post.create({
    title,
    body,
    time,
    user: user ? user : "Anonymous",
  });

  if (result) res.json({ message: "Posts Successfully added" });
  else res.status(400).json({ message: "Bad Request" });
};

//@desc update post
//@route PATCH /posts
//@access PRIVATE
const updatePost = async (req, res) => {
  const { title, body, reaction, id, comment } = req.body;

  if (!id) return res.status(400).json({ message: "ID is required" });

  const foundPost = await Post.findById(id).exec();
  if (!foundPost) return res.status(400).json({ message: "Post not found" });

  if (title) foundPost.title = title;
  if (body) foundPost.body = body;
  if (reaction) foundPost.reactions = reaction;
  if (comment) foundPost.comments.push(comment);
  const result = await foundPost.save();

  if (result) res.json({ message: "Successfully updated" });
  else res.status(400).json({ message: "Bad Request" });
};

//@desc delete post
//@route DELETE /posts
//@access PRIVATE
const deletePost = async (req, res) => {
  const { id } = req.body;
  if (!id) return res.status(400).json({ message: "ID is required" });

  const foundPost = await Post.findById(id).exec();
  if (!foundPost) return res.status(400).json({ message: "Post not found" });

  const result = await foundPost.deleteOne();
  if (result) res.json({ message: "Successfully deleted" });
  else res.status(400).json({ message: "Bad Request" });
};

module.exports = {
  getPosts,
  addPost,
  updatePost,
  deletePost,
};
