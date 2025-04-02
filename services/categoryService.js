const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const Category = require("../models/Category");
const ApiError = require("../utiles/ApiError");
const ApiFeatures = require("../utiles/apiFeatures");
const { deleteOne } = require("./handlersFactory");

// api/v1/categories/id
exports.getCategories = asyncHandler(async (req, res) => {
  const apiFeatures = new ApiFeatures(Category.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .search("Category");
      const countDocuments = await apiFeatures.query.clone().countDocuments();
      apiFeatures.paginate(countDocuments);
    
      const { query, paginationResult } = apiFeatures;
      const categories = await query;
    
      res.status(200).json({
        paginationResult,
        data: categories,
      });
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

exports.deleteCategory = deleteOne(Category);