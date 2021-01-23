const multer = require("multer");
const fs = require("fs");
// LOCAL MODULES
const User = require("./../models/userModel");
const AppError = require("./../utils/appError");
const catchAsync = require("./../utils/catchAsync");
const Faculty = require("../models/faculty");

// const multerStorage = multer.memoryStorage();

exports.updatephoto = catchAsync(async (req, res, next) => {
  let base64img = req.body.image;
  const path = "./public/images/";
  if (!base64img) {
    return new AppError("Please provide us an image.", 404);
  }
  if (!base64img.startsWith("data:image/png;base64,")) {
    return new AppError("Provided data is not in good formate.", 404);
  }
  const image = await User.findById(req.user._id).select("image");

  base64img = base64img.replace(/^data:image\/png;base64,/, "");
  const fileName =
    `user-${req.user._id}-${Date.now()}-` +
    req.user.name.replace(/ /gi, "_") +
    `.png`;
  fs.writeFileSync(path + fileName, base64img, "base64", (err) => {
    if (err) {
      return new AppError("We can't update image please try again ater.", 500);
    }
  });
  await User.findOneAndUpdate({ _id: req.user._id }, { image: fileName });
  await Faculty.findOneAndUpdate({ userId: req.user._id }, { image: fileName });
  await unlinkeImg(image);
  res.status(200).json({
    status: "success",
    message: "Image uploaded successfully.",
  });
});

const unlinkeImg = async (img) => {
  try {
    if (img.image == "default.jpg") return true;
    const path = `./public/images/` + img.image;
    fs.unlinkSync(path);
    return true;
  } catch (err) {
    return true;
  }
};
