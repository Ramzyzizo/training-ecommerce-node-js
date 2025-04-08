const jwt = require("jsonwebtoken");
const ApiError = require("../utiles/ApiError");
const User = require("../models/User");

const requireAuth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    next(new ApiError("Unauthorized", 401));
  }

  jwt.verify(token, process.env.JWT_SECRET, async(err, decoded) => {
    if (err) {
      res.locals.user = null;
      next(new ApiError("Forbidden", 403));
    }
    const user = await User.findById(decoded.id).lean();
    req.user = user;
    next();
  });
};

module.exports = { requireAuth };
