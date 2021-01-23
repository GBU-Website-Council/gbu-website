const express = require("express");
const formController = require("./../controller/formController");
const authController = require("./../controller/authController");

const router = express.Router();

//Api content
router.use(authController.protect);
router.use(authController.restrictTo("user"));
router
  .post("/profile", formController.profile)
  .post("/bio", formController.bio)
  .post("/teaching", formController.teaching)
  .post("/research", formController.research)
  .post("/publications", formController.publications)
  .post("/students", formController.students)
  .post("/contact", formController.contact)
  .get("/profile", formController.profile)
  .get("/bio", formController.bio)
  .get("/teaching", formController.teaching)
  .get("/research", formController.research)
  .get("/publications", formController.publications)
  .get("/students", formController.students)
  .get("/contact", formController.contact);

// View cotent
module.exports = router;
