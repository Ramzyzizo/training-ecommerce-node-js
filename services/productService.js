const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const ApiError = require("../utiles/ApiError");
const ApiFeatures = require("../utiles/apiFeatures");
const Product = require("../models/Product");
const { deleteOne, updateOne } = require("./handlersFactory");

// api/v1/products/id
exports.getProducts = asyncHandler(async (req, res) => {
  const apiFeatures = new ApiFeatures(Product.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .search("Product");
  const countDocuments = await apiFeatures.query.clone().countDocuments();
  apiFeatures.paginate(countDocuments);
  apiFeatures.query = apiFeatures.query.populate({
    path: "category",
    select: "name -_id slug",
  });

  const { query, paginationResult } = apiFeatures;
  const products = await query;

  res.status(200).json({
    paginationResult,
    data: products,
  });
});
// api/v1/products
exports.getProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findById(id).populate({
    path: "category",
    select: "name -_id slug",
  });
  if (!product) {
    return next(new ApiError(`Product not found for ${id}`, 404));
  }
  res.status(200).json({ data: product });
});

// api/v1/products/id
exports.createProduct = asyncHandler(async (req, res) => {
  req.body.slug = slugify(req.body.title);
  const product = await Product.create(req.body);
  res.status(201).json({ data: product });
});


exports.updateProduct = updateOne(Product);

exports.deleteProduct = deleteOne(Product);