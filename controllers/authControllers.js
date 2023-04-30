const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//@desc login user
//@route POST /auth
//@access PUBLIC
const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res
      .status(400)
      .json({ message: "Username and Password are required" });

  // Check username
  const foundUser = await User.findOne({ username: username })
    .collation({ locale: "en", strength: 2 })
    .exec();

  if (!foundUser) return res.status(401).json({ message: "Wrong Username" });

  // Check password
  const match = await bcrypt.compare(password, foundUser.password);
  if (!match) return res.status(401).json({ message: "Wrong Password" });

  // Create Tokens
  const accessToken = jwt.sign(
    {
      UserInfo: {
        username: foundUser.username,
        roles: foundUser.roles,
        avatar: foundUser.avatar,
      },
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "15m" }
  );

  const refreshToken = jwt.sign(
    {
      username: foundUser.username,
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "1d" }
  );

  res.cookie("jwt", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    maxAge: 60 * 60 * 24 * 7 * 1000,
  });

  res.json({ token: accessToken });
};

//@desc refresh token
//@route GET /auth
//@access PUBLIC
const refresh = async (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.jwt) return res.status(403).json({ message: "Login Expired" });

  const token = cookie.jwt;
  jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, async (err, decoded) => {
    if (err) return res.status(403).json({ message: "Login Expired" });

    // Check Username
    const foundUser = await User.findOne({ username: decoded.username })
      .collation({ locale: "en", strength: 2 })
      .exec();

    if (!foundUser) return res.status(401).json({ message: "Unauthorized" });

    const accessToken = jwt.sign(
      {
        UserInfo: {
          username: foundUser.username,
          roles: foundUser.roles,
          avatar: foundUser.avatar,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "15m",
      }
    );

    res.json({ token: accessToken });
  });
};

//@desc logout user
//@route POST /auth
//@access PUBLIC
const logout = async (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.jwt)
    return res.status(204).json({ message: "Cookie already Empty" });

  res.clearCookie("jwt", {
    httpOnly: true,
    secure: true,
    sameSite: "None",
  });

  res.json({ message: "Cookie Cleared!" });
};

module.exports = {
  login,
  logout,
  refresh,
};
