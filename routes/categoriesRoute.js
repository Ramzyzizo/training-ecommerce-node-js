const express = require("express");
const { param, validationResult } = require("express-validator");

const {
  getCategory,
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../services/categoryService");
const { getCategoryValidator, createCategoryValidator,updateCategoryValidator,deleteCategoryValidator } = require("../utiles/validators/categoryValidator");

const router = express.Router();

router
  .route("/")
  .get(getCategories)
  .post(createCategoryValidator,createCategory);
router
  .route("/:id")
  .get(getCategoryValidator, getCategory)
  .put(updateCategoryValidator, updateCategory)
  .delete(deleteCategoryValidator,deleteCategory);

module.exports = router;
