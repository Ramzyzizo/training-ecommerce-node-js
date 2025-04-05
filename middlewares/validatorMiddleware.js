const {  validationResult } = require("express-validator");

const validatorMiddleware = (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    const errors = {};
    result.array().forEach((error) => {
      errors[error.path] = error.msg;
    });

    return res.status(400).json({
      status: "fail",
      message: "Validation failed",
      errors,
    });
  }
  next();
};
module.exports = validatorMiddleware;
