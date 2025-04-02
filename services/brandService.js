const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const ApiError = require("../utiles/ApiError");
const Brand = require("../models/Brand");
const ApiFeatures = require("../utiles/apiFeatures");
const { deleteOne, updateOne } = require("./handlersFactory");

// api/v1/brands/id
exports.getBradns = asyncHandler(async (req, res) => {
    const apiFeatures = new ApiFeatures(Brand.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .search("Brand");
    const countDocuments = await apiFeatures.query.clone().countDocuments();
    apiFeatures.paginate(countDocuments);
  
    const { query, paginationResult } = apiFeatures;
    const brands = await query;
  
    res.status(200).json({
      paginationResult,
      data: brands,
    });
});
// api/v1/brands
exports.getBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const brand = await Brand.findById(id);
  if (!brand) {
    return next(new ApiError(`Brand not found for ${id}`, 404));
  }
  res.status(200).json({ data: brand });
});

// api/v1/brands/id
exports.createBrand = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const brand = await Brand.create({ name, slug: slugify(name) });
  res.status(201).json({ data: brand });
});

exports.updateBrand = updateOne(Brand);

exports.deleteBrand = deleteOne(Brand);