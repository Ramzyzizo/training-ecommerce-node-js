const mongoose = require("mongoose");

const subCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      unique: [true, "Name must be unique."],
      require: [true, "Name is required."],
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
      require: [true, "Parent Category is required."],
    },
  },
  { timestamps: true }
);
const SubCatgeory = mongoose.model("SubCatgeory", subCategorySchema);


module.exports = SubCatgeory;