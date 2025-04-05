const globalError = (err, req, res, next) => {
  statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  if (process.env.Node_ENV == "development") {
    sendErrorForDev(err, res);
  } else {
    sendErrorForProd(err, res);
  }
};

const sendErrorForDev = (err, res) => {
  const errors = {};
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    const value = err.keyValue[field];
    const message = `${field} '${value}' is already taken.`;
    return res.status(400).json({
      status: "fail",
      message,
      errors: {
        [field]: message,
      },
    });
  }
  if (err.errors && typeof err.errors === "object") {
    Object.keys(err.errors).forEach((key) => {
      errors[key] = err.errors[key].message;
    });
  }
  return res.status(statusCode).json({
    status: err.status,
    errors,
    message: err.message,
    stack: err.stack,
  });
};
const sendErrorForProd = (err, res) => {
  const errors = {};
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    const value = err.keyValue[field];
    const message = `${field} '${value}' is already taken.`;
    return res.status(400).json({
      status: "fail",
      message,
      errors: {
        [field]: message,
      },
    });
  }
  if (err.errors && typeof err.errors === "object") {
    Object.keys(err.errors).forEach((key) => {
      errors[key] = err.errors[key].message;
    });
  }
  return res.status(statusCode).json({
    status: err.status,
    errors,
    message: err.message,
  });
};
module.exports = globalError;
