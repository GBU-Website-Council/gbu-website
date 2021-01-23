var mongoose = require("mongoose");
const { default: validator } = require("validator");
// const User = require("./userModel");

var facultySchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Should be email."],
  },
  userId: {
    type: mongoose.Schema.ObjectId,
    require: true,
    unique: true,
  },
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
  name: String,
  position: String,
  school: String,
  qualification: String,
  field_of_teaching: String,
  image: String,
  updates: String,
  biography: String,
  academics: String,
  current_course: String,
  planned_course: String,
  past_course: String,
  research: String,
  books: String,
  patents: String,
  journals: String,
  conference_proceeding: String,
  phd_students: String,
  m_b_tech_students: String,
  graduated_students: String,
  research_assistants: String,
  summer_interns: String,
  independent_studies: String,
  contact_information: String,
  office_number: String,
  contact_phone_number: String,
  contact_phone_number_code: String,
  contact_email: {
    type: String,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valide email."],
  },
  correspondence_address: String,
  correspondence_phone_number: String,
  correspondence_phone_number_code: String,
  correspondence_email: {
    type: String,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valide email."],
  },
});

facultySchema.index({ userId: 1 });
facultySchema.index({ username: 1 });

facultySchema.post("save", async function () {
  if (!this.isModified("password") || !this.isNew) return;
  await User.findOne({ _id: this.userId }, async function (err, res) {
    res.image = this.image;
  });
});

module.exports = mongoose.model("faculty", facultySchema);
