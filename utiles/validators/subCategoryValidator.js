const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");
const SubCategory = require("../../models/SubCategory");
const Category = require("../../models/Category");

exports.getSubCategoryValidator = [
  check("id")
    .isMongoId()
    .withMessage("Invalied ID")
    .bail()
    .custom(async (value) => {
      const existingSubCategory = await SubCategory.findOne({ _id: value });
      if (!existingSubCategory) {
        throw new Error("SubCategory Not exist.");
      }
      return true;
    }),
  validatorMiddleware,
];

exports.createSubCategoryValidator = [
  check("name")
    .notEmpty()
    .withMessage("Name is required.")
    .bail()
    .isLength({ min: 3 })
    .withMessage("Name is too short")
    .bail()
    .isLength({ max: 30 })
    .withMessage("Name is too long")
    .bail()
    .custom(async (value) => {
      const existingSubCategory = await SubCategory.findOne({ name: value });
      if (existingSubCategory) {
        throw new Error("Name is already stored before.");
      }
      return true;
    }),
  check("category")
    .notEmpty()
    .withMessage("parent category is required.")
    .bail()
    .isMongoId()
    .withMessage("Invalid Category ID.")
    .bail()
    .custom(async (value) => {
      const existingCategory = await Category.findOne({ _id: value });
      if (!existingCategory) {
        throw new Error("Parent Category is not exist.");
      }
      return true;
    }),
  validatorMiddleware,
];
exports.updateSubCategoryValidator = [
  check("id")
    .isMongoId()
    .withMessage("Invalied ID")
    .bail()
    .custom(async (value) => {
      const existingCategory = await SubCategory.findOne({ _id: value });
      if (!existingCategory) {
        throw new Error("Sub Category is not exist.");
      }
      return true;
    }),
  validatorMiddleware,
];
exports.deleteSubCategoryValidator = [
  check("id")
    .isMongoId()
    .withMessage("Invalied ID")
    .bail()
    .custom(async (value) => {
      const existingCategory = await SubCategory.findOne({ _id: value });
      if (!existingCategory) {
        throw new Error("Sub Category is not exist.");
      }
      return true;
    }),
  validatorMiddleware,
];
