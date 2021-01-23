const express = require("express");
const Faculty = require("../models/faculty");
const User = require("../models/userModel");
const AppError = require("./../utils/appError");
const catchAsync = require("./../utils/catchAsync");
const formController = require("./formController");
const faculty = require("../models/faculty");
const async = require("async");

const rend = (req) => {
  let count = 0;
  [
    "name",
    "image",
    "field_of_teaching",
    "position",
    "qualification",
    "school",
  ].every((el) => {
    req.user.data[el] == req.user.data[el];
    if (
      (!req.user.data[el] ||
        req.user.data[el] == "" ||
        req.user.data[el] == " " ||
        req.user.data[el] == null ||
        req.user.data[el] == undefined) &&
      req.originalUrl == "/facultyzone/profile"
    ) {
      count = 1;
      return false;
    }
    return true;
  });
  return count; // true if profiles form not complete
};

exports.welcome = (req, res, next) => {
  res.status(200).render("form/welcome");
};

exports.index = (req, res, next) => {
  if (rend(req)) {
    res.status(302).redirect("/facultyzone/profileupdate");
  } else {
    // res.status(200).render('form/index');
    res.status(200).render("form/index");
  }
  // res.status(200).render('form/index');
};

exports.profile = catchAsync(async (req, res, next) => {
  // var data = await Faculty.findOne({ userId: req.user._id });//.select(user);
  // console.log(req.user);
  const school = [
    "University School of Information & Communication Technology",
    "University School of Management",
    "University School of BioTechnology",
    "University School of Engineering",
    "University School of Buddhist Studies & Civilization",
    "University School of Vocational Studies & Applied Sciences",
    "University School of Humanities & Social Sciences",
    "University School of Law, Justice & Governance",
  ];
  if (req.originalUrl == "/facultyzone/profileupdate") {
    res.status(200).render("form/profile", { school });
    return 0;
  } else {
    if (rend(req)) {
      res.status(200).render("form/profile", { school });
    } else {
      // res.status(200).render('form/index');
      res.status(302).redirect("/facultyzone/index");
    }
  }
});

exports.bio = (req, res, next) => {
  res.status(200).render("form/bio");
};
exports.me = (req, res, next) => {
  res.status(200).render("form/me");
};

exports.login = catchAsync( async(req, res, next) => {
  res.status(200).render("form/login");
});

exports.forgotpasword = (req, res, next) => {
  if (!req.params.token) {
    res.status(302).redirect("/facultyzone/login");
    return 1;
  }
  const token = req.params.token;
  res.status(200).render("form/resetpassForm", { token });
};

exports.allview = catchAsync(async (req, res, next) => {
  const limit = 12;
  let page = 1;
  let current = 1;
  if (+req.params.page) {
    page = req.params.page * 1;
    current = page;
  }
  const skip = (page - 1) * limit;
  // const total = await User.countDocuments({ active: true });
  const total = await User.countDocuments({ active: true });
  if (skip + 12 >= total) {
    var to = total;
  } else {
    to = skip + 12;
  }
  page = total / limit;
  if (page > parseInt(page)) page++;
  let count = new Object({
    from: skip + 1,
    to,
    total,
    page,
    current,
  });
  let list = new Array();
  const data = await User.find({ active: true }, { id: 1 })
    .skip(skip)
    .limit(limit)
    .sort("name");
  console.log(list);
  await async.forEach(data, async (val, key, cb) => {
    list.push(
      await Faculty.findOne(
        { userId: val._id },
        { name: 1, email: 1, image: 1, school: 1 }
      )
    );
  });
  res.status(200).render("form/allview", { list, count });
});
