const Product = require("../models/Product");
const { deleteOne, updateOne, createOne, getOne, getAll } = require("./handlersFactory");

// api/v1/products/id
exports.getProducts = getAll(Product);
// api/v1/products
exports.getProduct = getOne(Product);
// exports.getProduct = getOne(Product, {
//   path: "category",
//   select: "name -_id slug",
// });
//orrrrrrrrrrrrrrrrrr
// mongose middleware in Product Schema



// api/v1/products/id
exports.createProduct = createOne(Product);

exports.updateProduct = updateOne(Product);

exports.deleteProduct = deleteOne(Product);