var express = require("express");
var router = express.Router();
var auth = require("../middlewares/auth");
var user = require("../controllers/users");
/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/register", user.register);
router.post("/login", user.login);
router.get("/profile", auth.verifyToken, user.currentUser);
router.put("/profile", auth.verifyToken, user.updateUser);
module.exports = router;
