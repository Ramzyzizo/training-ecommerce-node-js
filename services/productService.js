const Product = require("../models/Product");
const { deleteOne, updateOne, createOne, getOne, getAll } = require("./handlersFactory");

// api/v1/products/id
exports.getProducts = getAll(Product);
// api/v1/products
exports.getProduct = getOne(Product);
// api/v1/products/id
exports.createProduct = createOne(Product);

exports.updateProduct = updateOne(Product);

exports.deleteProduct = deleteOne(Product);