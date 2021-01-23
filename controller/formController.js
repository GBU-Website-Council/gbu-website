const express = require("express");
const Faculty = require("../models/faculty");
const User = require("./../models/userModel");
const AppError = require("./../utils/appError");
const catchAsync = require("./../utils/catchAsync");
const factory = require("./factory");

// PROFILE UPDATING RELATED APIES
exports.profile = catchAsync(async (req, res, next) => {
  var fields = new Object();
  if (req.method == "GET") {
    let user = new Object();
    [
      "name",
      "position",
      "school",
      "qualification",
      "field_of_teaching",
    ].forEach((el) => {
      user[el] = true;
      fields[el] = factory.getTitle(el);
    });
    user._id = false;
    var data = await Faculty.findOne({ userId: req.user._id }).select(user);
    res.status(200).json({
      status: "success",
      fields,
      data,
    });
  } else {
    const {
      name,
      position,
      school,
      qualification,
      field_of_teaching,
    } = req.body;
    if (
      name == null ||
      position == null ||
      school == null ||
      qualification == null ||
      field_of_teaching == null ||
      name == "" ||
      position == "" ||
      school == "" ||
      qualification == "" ||
      field_of_teaching == ""
    ) {
      return next(new AppError("All fields are compulsory.", 400));
    }
    const user = await Faculty.findOne({ userId: req.user._id });
    user.name = name;
    user.position = position;
    user.school = school;
    user.qualification = qualification;
    user.field_of_teaching = field_of_teaching;
    const data = await user.save();
    await User.findByIdAndUpdate(req.user._id, { name: user.name });
    res.status(200).json({
      status: "success",
      data,
    });
  }
});

// BIOGRAPHY UPDATNG
exports.bio = factory.getSetData(["biography", "academics"], Faculty);
exports.research = factory.getSetData(["research"], Faculty);
exports.teaching = factory.getSetData(
  ["current_course", "planned_course", "past_course"],
  Faculty
);
exports.publications = factory.getSetData(
  ["books", "patents", "journals", "conference_proceeding"],
  Faculty
);
exports.students = factory.getSetData(
  [
    "phd_students",
    "m_b_tech_students",
    "graduated_students",
    "research_assistants",
    "summer_interns",
    "independent_studies",
  ],
  Faculty
);
exports.contact = factory.getSetData(
  [
    "contact_information",
    "contact_phone_number",
    "office_number",
    "contact_email",
    "correspondence_address",
    "correspondence_phone_number",
    "correspondence_email",
    'contact_phone_number_code',
    'correspondence_phone_number_code'
  ],
  Faculty
);

// Getting All data in A row with page numbers
// each page contains 15 dataRowa
exports.getAllData = catchAsync(async (req, res, next) => {
  const limit = 15;
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
  let pages = new Object({
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
    list.push(await Faculty.findOne({ userId: val._id }));
  });
  res.status(200).json({
    status: "success",
    pages,
    list,
  });
});
