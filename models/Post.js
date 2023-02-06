const moongose = require("mongoose");

const postSchema = moongose.Schema({
  user: {
    type: String,
    default: "Anonymous",
  },
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  reactions: {
    type: {},
    default: {
      like: 0,
      heart: 0,
      sad: 0,
    },
  },
  comments: {
    type: [{}],
  },
});

module.exports = moongose.model("Post", postSchema);
