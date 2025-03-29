const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Name is required."],
      unique: true,
      minLength: [3, "Name is too short"],
      maxLength: [30, "Name is too long"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    image: String,
  },
  { timestamps: true }
);
const Category = mongoose.model("Category", categorySchema);


module.exports = Category;