const express = require("express");
const adminController = require("./../controller/admincontroller");
const adminAuthController = require("./../controller/adminAuthController");

const router = express.Router();

// POST REQUEST
router.post("/login", adminAuthController.login);
router.get("/logout", adminAuthController.logout);
router.get("/search", adminController.search);

// PROTECTED ROUTS
router.use(adminAuthController.protect);
router.use(adminAuthController.restrictTo("root", "admin"));

// GET REQUESTS
router
  .get("/dashboard", adminController.dashboard)
  .get("/newregistrations/:page?", adminController.newRegistrations)
  .get("/allData/:page?", adminController.allData)
  .get("/confirmList/:page?", adminController.confirmList)
  .get("/pending/:page?", adminController.pending);

// PATCH REQUEST
router.patch("/updateuserstatus", adminController.updateUserStatus);
router.delete("/deleteuser", adminController.deleteUser);

module.exports = router;
