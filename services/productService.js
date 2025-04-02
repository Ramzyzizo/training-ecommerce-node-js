const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const ApiError = require("../utiles/ApiError");
const Product = require("../models/Product");

// api/v1/products/id
exports.getProducts = asyncHandler(async (req, res) => {
  const queryObj = { ...req.query };
  const excludeFields = ["page", "sort", "limit", "fields", "keyword"];

  // remove the fields from queryObj
  excludeFields.forEach((el) => delete queryObj[el]);

  // advanced filtering for equality and comparison
  // gt, gte, lt, lte, ne, eq
  let queryStr = JSON.stringify(queryObj);
  queryStr = queryStr.replace(/\b(gt|gte|lt|lte|ne|eq)\b/g, (match) => `$${match}`);

  //pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 2;
  const skip = (page - 1) * limit;

  // querying
  const productsQuery = Product.find(JSON.parse(queryStr))
  .skip(skip)
  .limit(limit)
  .populate({ path: "category", select: "name -_id slug" });

  // sorting 
  if(req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    productsQuery.sort(sortBy);
  }else{
    productsQuery.sort("-createdAt");
  }

  
  // field limiting
  if (req.query.fields) {
    const fields = req.query.fields.split(",").join(" ");
    productsQuery.select(fields);
  }
  // search
  if (req.query.keyword) {
     const {keyword} = req.query;
     productsQuery.find({
       $or: [
         { title: { $regex: keyword, $options: "i" } },
         { description: { $regex: keyword, $options: "i" } }
       ]
     });
  }
  
  const products = await productsQuery;
  res.status(200).json({ results: products.length, page, data: products });
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

exports.updateProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  if (req.body.title) {
    req.body.slug = slugify(req.body.title);
  }
  const product = await Product.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
  });
  if (!product) {
    return next(new ApiError(`Product not found for ${id}`, 404));
  }
  res.status(200).json({ data: product });
});

exports.deleteProduct = asyncHandler(async(req,res)=>{
  const { id } = req.params;
  const product = await Product.findByIdAndDelete(id);
  console.log(product);
  if (!product) {
    return res.status(404).json({ msg: `Product not found for ${id}` });
  }
  res.status(204).send();  
})