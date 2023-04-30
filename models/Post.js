const moongose = require("mongoose");

const postSchema = moongose.Schema({
  avatar: {
    type: String,
    required: true,
  },
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
      like: [],
      heart: [],
      sad: [],
    },
  },
  comments: {
    type: [{}],
  },
});

module.exports = moongose.model("Post", postSchema);
