const express = require("express");
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
} = require("../services/productService");
const { getProductValidator, createProductValidator,updateProductValidator,deleteProductValidator } = require("../utiles/validators/productValidator");

const router = express.Router();
router.route("/").get(getProducts).post(createProductValidator, createProduct);
router
  .route("/:id")
  .get(getProductValidator, getProduct)
  .put(updateProductValidator, updateProduct)
  .delete(deleteProductValidator,deleteProduct);

module.exports = router;
