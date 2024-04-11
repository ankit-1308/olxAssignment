const router = require("express").Router();
const AuthController = require("../controller/authController");

router.post("/signup", AuthController.userSignUp);
router.post("/login", AuthController.userLogIn);


module.exports = router;