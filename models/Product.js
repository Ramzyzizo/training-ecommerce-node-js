const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      minLength: [3, "Title is too short"],
      maxLength: [100, "Title is too long"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    description: {
      type: String,
      required: true,
      minLength: [30, "description is too short"],
    },
    quantity: {
      type: Number,
      required: true,
    },
    sold: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: true,
      trim: true,
    },
    priceAfterDiscount: {
      type: Number,
      trim: true,
    },
    coloers: {
      type: [String],
    },
    imageCover: {
      type: String,
      required: true,
    },
    image: [String],
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
      required: true,
    },
    subcategories: {
      type: [mongoose.Schema.ObjectId],
      ref: "SubCategory",
    },
    brand: {
      type: mongoose.Schema.ObjectId,
      ref: "Brand",
    },
    ratingAverage: {
      type: Number,
      min: [1, "Rating must be above or equal 1"],
      max: [5, "Rating must be below or equal 5"],
    },
    ratingQuantity: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);
// mongose middleware
productSchema.pre(/^find/,function(next){
  this.populate({
      path: "category",
      select: "name -_id slug",
  });
  next();
})
module.exports = mongoose.model("Product", productSchema);
