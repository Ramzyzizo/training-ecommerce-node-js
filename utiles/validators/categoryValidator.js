const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");
const Category = require("../../models/Category");

exports.getCategoryValidator=[
    check("id").isMongoId().withMessage("Invalied ID"),
    validatorMiddleware
]

exports.createCategoryValidator = [
  check("name")
    .notEmpty()
    .withMessage("Name is required.")
    .isLength({ min: 3 })
    .withMessage("Name is too short")
    .isLength({ max: 30 })
    .withMessage("Name is too long")
    .custom(async (value) => {
      const existingCategory = await Category.findOne({ name: value });
      if (existingCategory) {
        throw new Error("Name is already stored before.");
      }
      return true;
    }),
  validatorMiddleware,
];
exports.updateCategoryValidator = [
  check("id").isMongoId().withMessage("Invalied ID"),
  validatorMiddleware
];
exports.deleteCategoryValidator = [
  check("id").isMongoId().withMessage("Invalied ID"),
  validatorMiddleware
];