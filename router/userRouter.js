const express = require("express");
const authController = require("./../controller/authController");
const userController = require("./../controller/userController");

const router = express.Router();

router.post(
  "/updatepass",
  authController.protect,
  authController.updatePassword
);
router.post("/updatephoto", authController.protect, userController.updatephoto);
router.post("/forgotepassword", authController.forgotPassword);
router.post("/resetpassword/:token", authController.resertPassword);
router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/logout", authController.logout);

module.exports = router;
