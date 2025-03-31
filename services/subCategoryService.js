const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const SubCategory = require("../models/SubCategory");


exports.filterObject = (req, res, next) => {
  let filterObject = {};
  if (req.params.categoryId) filterObject = { category: req.params.categoryId };
  req.filterObject = filterObject;
  next();
}


// api/v1/categories/:categoryId/subCategories
// api/v1/subCategories/id
exports.getSubCategories = asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 2;
  const skip = (page - 1) * limit;
  const subCategories = await SubCategory.find(req.filterObject)
    .skip(skip)
    .limit(limit);
  res.status(200).json({ results: subCategories.length, page, data: subCategories });
});

// api/v1/subCategories
exports.getSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const existSubCategory = await SubCategory.findById(id)
  // to show the category name and slug only 
  // .populate({
  //   path: "category",
  //   select: "name -_id slug",
  // });
  res.status(200).json({ data: existSubCategory });
});


exports.setCategoryToBody = (req, res, next) => {
  if (!req.body.category) {
    req.body.category = req.params.categoryId;
  }
  next();
}
// api/v1/subCategories
exports.createSubCategory = asyncHandler(async (req, res) => {
  const { name,category } = req.body;
  const subCategory = await SubCategory.create({
    name,
    slug: slugify(name),
    category,
  });
  res.status(201).json({ data: subCategory });
});

// api/v1/subCategories/:id
exports.updateSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name, category } = req.body;
  const subCategory = await SubCategory.findOneAndUpdate(
    { _id: id },
    { name, slug: slugify(name), category },
    { new: true }
  );
  res.status(200).json({ data: subCategory });
});

// api/v1/subCategories/:id
exports.deleteSubCategory = asyncHandler(async(req,res)=>{
  const { id } = req.params;
  const subCategory = await SubCategory.findByIdAndDelete(id);
  res.status(204).json({ data: subCategory,msg:"Deleted successfully" });
})
