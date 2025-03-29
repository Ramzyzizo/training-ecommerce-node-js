const mongoose = require("mongoose");
const Category = require("./Category");

const subCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      unique: true,
      required: [true, "Name is required."],
      minLength: [3, "Name is too short"],
      maxLength: [30, "Name is too long"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
      required: [true, "Parent Category is required."],
    },
  },
  { timestamps: true }
);
const SubCategory = mongoose.model("SubCategory", subCategorySchema);

module.exports = SubCategory;