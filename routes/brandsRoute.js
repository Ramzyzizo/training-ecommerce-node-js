const express = require("express");
const brandService = require("../services/brandService");
const brandValidator = require("../utiles/validators/brandValidator");

const router = express.Router();
router
  .route("/")
  .get(brandService.getBradns)
  .post(brandValidator.createBrandValidator, brandService.createBrand);
router
  .route("/:id")
  .get(brandValidator.getBrandValidator, brandService.getBrand)
  .put(brandValidator.updateBrandValidator, brandService.updateBrand)
  .delete(brandValidator.deleteBrandValidator, brandService.deleteBrand);

module.exports = router;
