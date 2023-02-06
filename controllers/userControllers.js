const User = require("../models/User");
const bcrypt = require("bcrypt");

//@desc create a user
//@route POST /users
//@access PUBLIC
const createUser = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res
      .status(400)
      .json({ message: "Username and Passwor are required" });

  // check if there is a duplicate
  const duplicate = await User.findOne({ username: username })
    .collation({ locale: "en", strength: 2 })
    .lean();

  if (duplicate) return res.status(409).json({ message: "duplicate found" });

  const hashPass = await bcrypt.hash(password, 10);

  // Create the user
  const result = await User.create({
    username,
    password: hashPass,
  });

  if (result) res.json(`${result.username} successfully created`);
  else res.status(400).json({ message: "Bad Request" });
};

module.exports = {
  createUser,
};
