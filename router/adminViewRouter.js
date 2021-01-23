const express = require("express");
const adminController = require("./../controller/admincontroller");
const adminAuthController = require("./../controller/adminAuthController");

const router = express.Router();

router.get(
  "/login",
  adminAuthController.isloggedIn,
  adminController.adminLogin
);

// PROTECTED ROUT
router.use(adminAuthController.ViewProtect);
router.use(adminAuthController.restrictTo("root", "admin"));

// Get
router.get("/", adminController.administrator);

module.exports = router;
