const AppError = require("./../utils/appError");

const handleCastErrorDB = (err) => {
  const message = "Invalid " + err.path + " : " + err.value;
  return new AppError(message, 400);
};
const handleDuplicateFieldsDB = (err) => {
  const value = err.errmsg.match(/(["'])(\\?.)*?/);
  const message =
    "Duplic ate Fields value: " + value + ". Please use another value";
  return new AppError(message, 400);
};
const handleValidationError = (err) => {
  const errors = object.value(err.errors).map((el) => el.message);
  const message = "Invalid input data" + errors.join(". ");
  return new AppError(message, 400);
};
//  JWT ERROR
handleJwtError = () =>
  new AppError("Somthing went wrong please login  again", 401);
TokenExpiredError = () => new AppError("Your Token has expired .", 401);

// Production Error
const productionError = (req, res, err) => {
  if (req.originalUrl.startsWith("/api")) {
    if (err.isOperational) {
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
    }
    return res.status(500).json({
      status: "error",
      message: "Please try again later!",
    });
  }
  if (err.isOperational) {
    return res.status(404).render("404");
  }
  return res.status(404).render("404");
};

// Development Error
const developmentError = (req, res, err) => {
  if (req.originalUrl.startsWith("/api")) {
    res.status(err.statusCode).json({
      status: err.status,
      Error: err,
      message: err.message,
      stack: err.stack,
    });
    console.log(err);
  } else {
    res.status(404).render("404");
    console.log(err);
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500; // 500 == Server Internal error
  err.status = err.status || "Error";
  if (process.env.NODE_ENV === "development") {
    developmentError(req, res, err);
  } // Sending to user
  else if (process.env.NODE_ENV === "production") {
    let error = { ...err };
    if (error.name === "CastError") error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    if (error.name === "ValidationError") error = handleValidationError(error);
    if (error.name === "JsonWebTokenError") error = handleJwtError();
    if (error.name === "TokenExpiredError") error = TokenExpiredError();
    productionError(req, res, err);
  }
};
