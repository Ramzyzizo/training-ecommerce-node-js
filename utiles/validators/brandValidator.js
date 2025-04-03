const { check, body } = require("express-validator");
const slugify = require("slugify");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");
const Brand = require("../../models/Brand");



exports.getBrandValidator=[
    check("id").isMongoId().withMessage("Invalied ID"),
    validatorMiddleware
]

exports.createBrandValidator = [
  check("name")
    .notEmpty()
    .withMessage("Name is required.")
    .isLength({ min: 3 })
    .withMessage("Name is too short")
    .isLength({ max: 30 })
    .withMessage("Name is too long")
    .custom(async (value) => {
      const existingBrand = await Brand.findOne({ name: value });
      if (existingBrand) {
        throw new Error("Name is already stored before.");
      }
      return true;
    })
    .custom((value, { req }) => {
        if (value) {
          req.body.slug = slugify(value);
        }
        return value;
      }),
  validatorMiddleware,
];

exports.updateBrandValidator = [
  check("id").isMongoId().withMessage("Invalied ID"),
  body("name").custom((value, { req }) => {
    if (value) {
      req.body.slug = slugify(value);
    }
     return value;
  }),
  validatorMiddleware
];

exports.deleteBrandValidator = [
  check("id").isMongoId().withMessage("Invalied ID"),
  validatorMiddleware
];