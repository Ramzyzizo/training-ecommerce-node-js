const Category = require("../models/Category");
const { deleteOne, updateOne, createOne, getOne, getAll } = require("./handlersFactory");

// api/v1/categories
exports.getCategories = getAll(Category);
// api/v1/categories/id
exports.getCategory = getOne(Category);
// api/v1/categories/id
exports.createCategory = createOne(Category);

exports.updateCategory = updateOne(Category);

exports.deleteCategory = deleteOne(Category);