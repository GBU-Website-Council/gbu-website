const express = require("express");
const authcontroller = require("./../controller/authController");
const formViewController = require("./../controller/formViewController");

const router = express.Router();

router
  .get("/", authcontroller.ViewProtect, formViewController.welcome)
  .get(
    "/index",
    authcontroller.ViewProtect,
    authcontroller.restrictTo("user"),
    formViewController.index
  )
  .get(
    "/profile",
    authcontroller.ViewProtect,
    authcontroller.restrictTo("user"),
    formViewController.profile
  )
  .get(
    "/profileupdate",
    authcontroller.ViewProtect,
    authcontroller.restrictTo("user"),
    formViewController.profile
  )
  .get("/me", authcontroller.ViewProtect, formViewController.me)
  .get("/login", authcontroller.isloggedIn, formViewController.login)
  .get(
    "/forgotepasswordreset/:token",
    authcontroller.isloggedIn,
    formViewController.forgotpasword
  )
  .get(
    "/allview/:page?",
    authcontroller.isloggedIn,
    formViewController.allview
  );

module.exports = router;
