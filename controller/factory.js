const catchAsync = require("./../utils/catchAsync");
const appError = require("./../utils/appError");

const filterObj = (obj, ...allAllowd) => {
  const newObj = {};
  Object.keys(obj).forEach(el => {
    if (allAllowd.includes(el)) {
      newObj[key] = obj[key];
    }
  })
  return newObj;
}

exports.getTitle = (str) => {
  const arr = str.split('_');
  var data = "";
  arr.forEach(el => {
    data += el.charAt(0).toUpperCase() + el.slice(1) + " ";
  });
  return data;
}

exports.getSetData = (field, Model) =>
  catchAsync(async (req, res, next) => {
    var fields = new Object();
    if (req.method == "GET") {
      let user = new Object();

      field.forEach((el) => {
        user[el] = true;
        fields[el] = this.getTitle(el);
      });

      var data = await Model.findOne({ userId: req.user._id }).select(user);

    } else {
      const user = await Model.findOne({ userId: req.user._id });
      field.forEach((el) => {
        user[el] = req.body[el];
      });
      var data = await user.save();
    }
    res.status(200).json({
      status: "success",
      fields,
      data,
    });
  });


