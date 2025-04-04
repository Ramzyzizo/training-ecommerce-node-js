const express = require("express");
const {
  getCategory,
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../services/categoryService");
const { getCategoryValidator, createCategoryValidator,updateCategoryValidator,deleteCategoryValidator } = require("../utiles/validators/categoryValidator");

const router = express.Router();
const subCategoriesRoute = require("./subCategoriesRoute");

router.use("/:categoryId/subCategories",subCategoriesRoute);

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
