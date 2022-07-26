const express = require("express");
const { like } = require("../controllers/likeRoute");
const { authToken } = require("../middleware/auth");
const router = express.Router();

router.route("/").post(authToken, like);

module.exports = router;
