const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");
const Product = require("../../models/Product");
const Category = require("../../models/Category");
const SubCategory = require("../../models/SubCategory");

exports.getProductValidator = [
  check("id").isMongoId().withMessage("Invalied ID"),
  validatorMiddleware,
];

exports.createProductValidator = [
  check("title")
    .notEmpty()
    .bail()
    .withMessage("Title is required.")
    .isLength({ min: 3 })
    .bail()
    .withMessage("Title is too short")
    .isLength({ max: 30 })
    .withMessage("Title is too long")
    .bail()
    .custom(async (value) => {
      const existingProduct = await Product.findOne({ title: value });
      if (existingProduct) {
        throw new Error("Title is already stored before.");
      }
      return true;
    }),
  check("description")
    .notEmpty()
    .withMessage("description is required.")
    .bail()
    .isLength({ min: 30 })
    .withMessage("description is too short")
    .bail(),
  check("quantity")
    .notEmpty()
    .withMessage("quantity is required.")
    .bail()
    .isNumeric()
    .withMessage("quantity must be a number")
    .bail(),
  check("price")
    .notEmpty()
    .withMessage("price is required.")
    .bail()
    .isNumeric()
    .withMessage("price must be a number")
    .bail(),
  check("priceAfterDiscount")
    .optional()
    .isNumeric()
    .withMessage("priceAfterDiscount must be a number")
    .bail()
    .toFloat()
    .custom((value, { req }) => {
      if (value >= req.body.price) {
        throw new Error("priceAfterDiscount must be less than price");
      }
      return true;
    })
    .bail(),
  check("colors").optional().isArray().withMessage("colors must be an array"),
  check("imageCover").notEmpty().withMessage("imageCover is required.").bail(),
  check("category")
    .notEmpty()
    .withMessage("category is required.")
    .bail()
    .isMongoId()
    .withMessage("category must be a valid ID")
    .custom(async (value) => {
      const existingCategory = await Category.findOne({ _id: value });
      if (!existingCategory) {
        throw new Error("Category is not exist.");
      }
      return true;
    }),
  check("subcategories")
    .isArray()
    .withMessage("subcategories must be a valid Array")
    .custom((subcategorieIds, { req }) =>
      SubCategory.find({
        _id: { $in: subcategorieIds },
        category: req.body.category,
      }).then((subcategories) => {
        if (subcategories.length !== subcategorieIds.length) {
          throw new Error("One or more subcategories do not exist, or not belong to the Parent Category.");
        }
      })
    )

    .bail(),
  validatorMiddleware,
];
exports.updateProductValidator = [
  check("id").isMongoId().bail().withMessage("Invalied ID"),
  validatorMiddleware,
];
exports.deleteProductValidator = [
  check("id").isMongoId().withMessage("Invalied ID"),
  validatorMiddleware,
];
