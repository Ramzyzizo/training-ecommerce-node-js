const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const ApiError = require("../utiles/ApiError");

exports.Register = asyncHandler(async (req, res) => {
  const user = await User.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      user,
    },
  });
});
exports.Login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ApiError(`Please provide email and password!`, 404));
  }
  // Check if user exists && password is correct
  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.correctPassword(password, user.password))) {
    return res.status(401).json({
      status: "fail",
      message: "Incorrect email or password",
    });
  }
  // If everything is ok, send token to client
  const token = user.createToken();
  res.cookie("jwt", token, {
    expires: new Date(Date.now() + process.env.JWT_EXPIRES_IN * 1000),
    httpOnly: true,
    secure: true,
    sameSite: "None",
  });
  res.status(200).json({
    status: "success",
    token,
  });
});

exports.Logout = asyncHandler(async (req, res) => {
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({
    status: "success",
  });
});
