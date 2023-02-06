const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/userControllers");
const verifyJWT = require("../middleware/verifyJWT");

router.route("/").post(userControllers.createUser);

module.exports = router;
