const moongose = require("mongoose");

const userSchema = moongose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    roles: {
      type: [String],
      default: ["User"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = moongose.model("User", userSchema);
