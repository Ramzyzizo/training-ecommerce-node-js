const express = require("express");
const {
  getBrand,
  getBradns,
  createBrand,
  updateBrand,
  deleteBrand
} = require("../services/brandService");
const { getBrandValidator, createBrandValidator,updateBrandValidator,deleteBrandValidator } = require("../utiles/validators/brandValidator");

const router = express.Router();
router
  .route("/")
  .get(getBradns)
  .post(createBrandValidator,createBrand);
router
  .route("/:id")
  .get(getBrandValidator, getBrand)
  .put(updateBrandValidator, updateBrand)
  .delete(deleteBrandValidator,deleteBrand);

module.exports = router;
