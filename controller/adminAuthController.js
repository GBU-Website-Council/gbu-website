const crypto = require("crypto");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const User = require("./../models/adminModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const Email = require("./../utils/email");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_ADMIN, {
    expiresIn: process.env.JWT_EXPIREIN_ADMIN,
  });
};
exports.createSendToken = (user, statusCode, req, res) => {
  const token = signToken(user._id);
  // JWT_COOKIE_EXP
  const cookieOptons = {
    expires: new Date(Date.now() + 60 * 60 * 1000),
    httpOnly: true,
    secure: false,
    // secure: req.secure || req.headers('x-forwarded-proto') === 'https',
  };
  res.cookie("adaccckuni", token, cookieOptons);
  user.password = undefined;
  res.status(statusCode).json({
    status: "success",
    // token,
    data: {
      user,
    },
  });
};

// Module area Registration
// exports.signup = catchAsync(async (req, res, next) => {
//   if (!req.body.email.includes("@gbu.ac.in")) {
//     return new AppError(
//       "Please provide a valid email given by your IT department",
//       400
//     );
//   }
//   const newUser = await User.create({
//     name: req.body.name,
//     email: req.body.email,
//     password: req.body.password,
//     passwordConfirm: req.body.passwordConfirm,
//   });
//   // const url = `${req.protocol}://${req.get("host")}/me`;
//   this.createSendToken(newUser, 201, req, res);
// });

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  // 1)
  if (!email || !password) {
    return next(new AppError("Plaese provide us your email and password", 400));
  }
  // 2)
  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Incorrect email or password", 401));
  }
  // 3)
  this.createSendToken(user, 200, req, res);
});

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.adaccckuni) {
    token = req.cookies.adaccckuni;
  }

  if (!token) {
    return next(new AppError("You are not logged in!", 401));
  }
  const decoded = await promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET_ADMIN
  );
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(new AppError("The user not exist!."), 201);
  }
  // 4)

  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError("User recently changed password! Please login again", 401)
    );
  }
  // Grant access to new route
  req.user = currentUser;
  res.locals.user = currentUser;
  next();
});

exports.ViewProtect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.adaccckuni) {
    token = req.cookies.adaccckuni;
  }

  if (!token) {
    res
      .status(401)
      .render("admin/login", { message: "You are not logged in!" });
    // return next(new AppError("You are not logged in!", 401));
    return 0;
  }

  var decoded = await promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET_ADMIN
  );
  var currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    res.status(401).render("admin/login", { message: "The user not exist!." });
    // return next(new AppError("The user not exist!."), 201);
    return 0;
  }
  // 4)

  if (currentUser.changedPasswordAfter(decoded.iat)) {
    // return next(  new AppError("User recently changed password! Please login again", 401) );
    res.status(401).render("admin/login", {
      message: "User recently changed password! Please login again",
    });
    return 0;
  }
  // Grant access to new route
  // await Faculty.
  req.user = currentUser;
  res.locals.user = currentUser;
  next();
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You do not have permission to perform this action!", 403)
      );
    }
    next();
  };
};

exports.isloggedIn = async (req, res, next) => {
  var token;
  try {
    if (req.cookies.adaccckuni) {
      token = req.cookies.adaccckuni;
    }
    if (!token) {
      // return next(new AppError("You are not logged in!", 401));
      return next();
    }

    const decoded = await promisify(jwt.verify)(
      token,
      process.env.JWT_SECRET_ADMIN
    );
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      // return next(new AppError("The user not exist!."), 201);
      return next();
    }
    // 4)

    if (currentUser.changedPasswordAfter(decoded.iat)) {
      // return next(  new AppError("User recently changed password! Please login again", 401) );

      return next();
    }
    // Grant access to new route
    req.user = currentUser;
    return next();
  } catch (error) {
    return next();
  }
};

exports.logout = (req, res) => {
  res.cookie("adaccckuni", null, {
    expires: new Date(Date.now() - 1000 * 1000),
    httpOnly: true,
  });
  res.status(200).json({
    status: "success",
  });
};

exports.updatePassword = catchAsync(async (req, res, next) => {
  // 1) Get user from colection
  const user = await User.findById(req.user._id).select("+password");
  if (!user) {
    return next(new AppError("Please login again.", 404));
  }

  // 2) check posted passwored is correct
  if (!(await user.correctPassword(req.body.currentPassword, user.password))) {
    return next(new AppError("Your curennt password not matched.", 401));
  }
  // 3) is so update user  password
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();

  // 4) log user in
  this.createSendToken(user, 200, req, res);
});

// GET RESET TOKEN
exports.forgotPassword = catchAsync(async (req, res, next) => {
  //1)  Get user based on POST email
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError("There is no user with this username.", 404));
  }

  // 2) Generate the rendom token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  // 3) send to user's email
  try {
    const resetURL =
      req.protocol +
      "://" +
      req.get("host") +
      "/facultyzone/forgotepasswordreset/" +
      resetToken;
    // await sendEmail({
    //   email: user.email,
    //   subject: 'Your password reset token (valid for 10 min)',
    //   message,
    // });

    await new Email(user, resetURL).sendPasswordReset();
    res.status(200).json({
      status: "success",
      message: "Password Reset link has been sent on your registered email.",
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passworsResetTokenExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(
      new AppError(
        "There was an error sending the email! Try again later.",
        500
      )
    );
  }
});

// Resseting password BY Password
exports.resertPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on token
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });
  // console.log(user);

  // 2) Set new password
  if (!user) {
    return next(new AppError("Token has expiered or Invalid", 400));
  }
  // 3) Update password
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passworsResetTokenExpires = undefined;
  await user.save();

  // 4) log the user in
  this.createSendToken(user, 200, req, res);
});
