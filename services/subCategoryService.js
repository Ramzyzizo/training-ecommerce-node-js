const SubCategory = require("../models/SubCategory");
const { deleteOne, updateOne, createOne, getOne, getAll } = require("./handlersFactory");

// api/v1/categories/:categoryId/subCategories
// api/v1/subCategories/id
exports.getSubCategories = getAll(SubCategory);
// api/v1/subCategories
exports.getSubCategory = getOne(SubCategory);

// api/v1/subCategories
exports.createSubCategory = createOne(SubCategory);
// api/v1/subCategories/:id
exports.updateSubCategory = updateOne(SubCategory);
// api/v1/subCategories/:id
exports.deleteSubCategory = deleteOne(SubCategory);

// to get sub of Main Category
exports.filterObject = (req, res, next) => {
  let filterObject = {};
  if (req.params.categoryId) filterObject = { category: req.params.categoryId };
  req.filterObject = filterObject;
  next();
}
// to set parent category from params to body 
exports.setCategoryToBody = (req, res, next) => {
  if (!req.body.category) {
    req.body.category = req.params.categoryId;
  }
  next();
}