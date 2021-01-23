const crypto = require("crypto");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const adminAuthController = require("./adminAuthController");
const path = require("path");
const User = require("./../models/adminModel");
const fUser = require("./../models/userModel"); // Faculty User data
const fData = require("./../models/faculty"); // Faculty data
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const fs = require("fs");
const Email = require("./../utils/email");
const {
  find,
  countDocuments,
  findByIdAndDelete,
} = require("./../models/faculty");
const { read } = require("fs");

//  FUNCTIONS
const sendRes = (res, status, data, code = 200) => {
  res.status(code).json({
    status: status,
    data,
  });
};
function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

// API
exports.dashboard = catchAsync(async (req, res, next) => {
  const data = new Object();
  data.newRegistrations = await fUser.countDocuments({
    createdAt: { $gt: new Date(Date.now()) - 1000 * 60 * 60 * 24 * 30 },
  });
  data.totalRegistrations = await fUser.countDocuments({});
  data.confirmed = await fUser.countDocuments({ active: true });
  data.pending = data.totalRegistrations - data.confirmed;
  sendRes(res, "success", data);
});
// confirm user list
exports.confirmList = catchAsync(async (req, res, next) => {
  const data = new Object();
  const limit = 15;
  let skip = 0;
  data.currentPage = 1;
  if (req.params.page && req.params.page > 0) {
    skip = (req.params.page * 1 - 1) * limit;
    data.currentPage = req.params.page * 1;
  }
  data.total = await fUser.countDocuments({ active: true });
  data.data = await fUser
    .find({ active: true })
    .select({ name: 1, image: 1, _id: 1, email: 1, active: 1 })
    .skip(skip)
    .limit(limit)
    .sort("name");
  data.result = data.data.length;
  data.pages =
    data.total % limit
      ? parseInt(data.total / limit) + 1
      : parseInt(data.total / limit);
  sendRes(res, "success", data);
});
// NEW Registration Request
exports.newRegistrations = catchAsync(async (req, res, next) => {
  const data = new Object();
  const limit = 15;
  let skip = 0;
  data.currentPage = 1;
  if (req.params.page && req.params.page > 0) {
    skip = (req.params.page * 1 - 1) * limit;
    data.currentPage = req.params.page * 1;
  }
  data.total = await fUser.countDocuments({});
  data.data = await fUser
    .find({
      createdAt: { $gte: new Date(Date.now()) - 1000 * 60 * 60 * 24 * 30 },
    })
    .select({ name: 1, image: 1, _id: 1, email: 1, active: 1, createdAt: 1 })
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });
  data.result = data.data.length;
  data.pages =
    data.total % limit
      ? parseInt(data.total / limit) + 1
      : parseInt(data.total / limit);
  sendRes(res, "success", data);
});
// Pending Request
exports.pending = catchAsync(async (req, res, next) => {
  const data = new Object();
  const limit = 15;
  let skip = 0;
  data.currentPage = 1;
  if (req.params.page && req.params.page > 0) {
    skip = (req.params.page * 1 - 1) * limit;
    data.currentPage = req.params.page * 1;
  }
  data.total = await fUser.countDocuments({ active: false });
  data.data = await fUser
    .find({ active: false })
    .select({ name: 1, image: 1, _id: 1, email: 1, active: 1 })
    .skip(skip)
    .limit(limit)
    .sort("name");
  data.result = data.data.length;
  data.pages =
    data.total % limit
      ? parseInt(data.total / limit) + 1
      : parseInt(data.total / limit);
  sendRes(res, "success", data);
});
// All users data
exports.allData = catchAsync(async (req, res, next) => {
  const data = new Object();
  const limit = 15;
  let skip = 0;
  data.currentPage = 1;
  if (req.params.page && req.params.page > 0) {
    skip = (req.params.page * 1 - 1) * limit;
    data.currentPage = req.params.page * 1;
  }
  data.total = await fUser.countDocuments({});
  data.data = await fUser
    .find()
    .select({ name: 1, image: 1, _id: 1, email: 1, active: 1 })
    .skip(skip)
    .limit(limit)
    .sort({ name: 1 });
  data.result = data.data.length;
  data.pages =
    data.total % limit
      ? parseInt(data.total / limit) + 1
      : parseInt(data.total / limit);
  sendRes(res, "success", data);
});
// Update User Status Active Or inactive
exports.updateUserStatus = catchAsync(async (req, res, next) => {
  const { id, active } = req.body;
  const data = await fUser.findById(id);
  if (!data) {
    return next(new AppError("User not found", 404));
  }
  data.active = active;
  await data.save({ validateBeforeSave: false });
  const newData = new Object();
  newData.name = data.name;
  newData.image = data.image;
  newData._id = data._id;
  newData.email = data.email;
  newData.active = data.active;
  sendRes(res, "success", newData);
});
// Delete user with th user id
exports.deleteUser = catchAsync(async (req, res, next) => {
  const { password, id } = req.body;
  const data = new Object();
  const user = await User.findById(req.user._id).select("+password");
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Validation failed.", 404));
  }
  const delUser = await fUser.findById(id);
  if (!delUser) {
    return next(new AppError("User dose not exist.", 404));
  }
  data.user = await fUser.findByIdAndDelete(id);
  data.fields = await fData.findOneAndDelete({ userId: id });
  if (!data.user.image.includes("default")) {
    fs.unlink(`${__dirname}/../public/images/${data.user.image}`, (err) => {});
  }
  sendRes(res, "success", data);
});
// Searche
exports.search = catchAsync(async (req, res, next)=>{
  var noMatch = "";
  var q = "";
  if (req.query.q) {
    q = "foo";
    const data = await fUser.find({ name: {"$regex" : req.query.q,  "$options": "i" } }, {name : 1, image : 1, email : 1, _id:1}).limit(5);
    res.status(200).json({
      status : 'success',
      result : data.length,
      data,
    });
  } else {
    const data = await fUser.find({}, {name : 1, image : 1, email : 1, _id:1}).sort({ name: 1 }).limit(5);
    res.status(200).json({
      status : "success",
      result : data.length,
      data
    })
  }
})

// ???????????????????????????????????????????????????????????????????????????????????
// VIEW FUNTIONS
// Dashboard Page
exports.administrator = catchAsync(async (req, res, next) => {
  const data = new Object();
  data.totalRegistration = await fUser.countDocuments({});
  data.newRegistration = await fUser.countDocuments({
    createdAt: { $gt: new Date(Date.now()) - 1000 * 60 * 60 * 24 * 30 },
  });
  data.confirmed = await fUser.countDocuments({ active: true });
  data.pending = data.totalRegistration - data.confirmed;
  res.status(200).render("admin/index.ejs", { data });
});
// login Page
exports.adminLogin = catchAsync(async (req, res, next) => {
  if (req.user) {
    return res.status(302).redirect("/administrator");
  }
  res.status(200).render("admin/login.ejs");
});
