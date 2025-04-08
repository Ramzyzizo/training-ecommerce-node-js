const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const ApiError = require("../utiles/ApiError");


const createToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

exports.Register = asyncHandler(async (req, res) => {
  const user = await User.create(req.body);
  const token = createToken(user._id);

  res.status(201).json({
    status: "success",
    data: {
      user,
      token,
    },
  });
});
exports.Login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ApiError(`Please provide email and password!`, 404));
  }
  try{
    const user = await User.findOne({ email });
    if (!user || !(await user.correctPassword(password, user.password))) {
      return res.status(400).json({
        status: "fail",
        message: "Incorrect email or password",
        errors: {
          email: "Incorrect email or password",
        },
      });
    }
    // If everything is ok, send token to client
    const token = createToken(user._id);
    res.status(200).json({
      status: "success",
      user,
      token,
    });
  }
  catch (error) {
    return next(new ApiError(error.message, 400));
  }
});

exports.Logout = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {maxAge: 1,
    httpOnly: true,
  });
  res.status(200).json({
    status: "success",
  });
});
