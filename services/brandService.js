const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const ApiError = require("../utiles/ApiError");
const Brand = require("../models/Brand");

// api/v1/brands/id
exports.getBradns = asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 2;
  const skip = (page - 1) * limit;
  const brands = await Brand.find({}).skip(skip).limit(limit);
  res.status(200).json({ results: brands.length, page, data: brands });
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

exports.updateBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  const brand = await Brand.findOneAndUpdate(
    { _id: id },
    { name, slug: slugify(name) },
    { new: true }
  );
  if (!brand) {
    return next(new ApiError(`Brand not found for ${id}`, 404));
  }
  res.status(200).json({ data: brand });
});

exports.deleteBrand = asyncHandler(async(req,res)=>{
  const { id } = req.params;
  const brand = await Brand.findByIdAndDelete(id);
  console.log(brand);
  if (!brand) {
    return res.status(404).json({ msg: `Category not found for ${id}` });
  }
  res.status(204).send();  
})