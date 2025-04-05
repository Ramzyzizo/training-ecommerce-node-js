const mongoose = require("mongoose");
const {  isEmail } = require("validator");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Please provide your name!"],
    },
    email: {
      type: String,
      required: [true, "Please provide your email!"],
      lowercase: true,
      validate: [isEmail, `Email is not a valid email!`],
      unique: true,
    },
    phone: {
      type: String,
    },
    profileImg: String,
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    isActive: {
      type: Boolean,
      default: true,
    },

  },
  { timestamps: true }
);
const User = mongoose.model("User", userSchema);


module.exports = User;