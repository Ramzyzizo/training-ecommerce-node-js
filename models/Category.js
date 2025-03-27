const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      require: [true, "Name is required."],
      unique: [true, "Name must be unique."],
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
const Category = mongoose.model("Catgeory", categorySchema);


module.exports = Category;