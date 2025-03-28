const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const Category = require("../models/Category");
const ApiError = require("../utiles/ApiError");

// api/v1/categories/id
exports.getCategories = asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 2;
  const skip = (page - 1) * limit;
  const categories = await Category.find({}).skip(skip).limit(limit);
  res.status(200).json({ results: categories.length, page, data: categories });
});
// api/v1/categories
exports.getCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const category = await Category.findById(id);
  if (!category) {
    return next(new ApiError(`Category not found for ${id}`, 404));
  }
  res.status(200).json({ data: category });
});

// api/v1/categories/id
exports.createCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const category = await Category.create({ name, slug: slugify(name) });
  res.status(201).json({ data: category });
});

exports.updateCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  const category = await Category.findOneAndUpdate(
    { _id: id },
    { name ,slug:slugify(name)},
    { new: true }
  );
  if (!category) {
    return next(new ApiError(`Category not found for ${id}`, 404));
  }
  res.status(200).json({ data: category });
});

exports.deleteCategory = asyncHandler(async(req,res)=>{
  const { id } = req.params;
  const category = await Category.findByIdAndDelete(id);
  console.log(category);
  if (!category) {
    return res.status(404).json({ msg: `Category not found for ${id}` });
  }
  res.status(204).send();  
})