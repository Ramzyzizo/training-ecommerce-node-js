const Brand = require("../models/Brand");
const { deleteOne, updateOne, createOne, getOne, getAll } = require("./handlersFactory");

// api/v1/brands/id
exports.getBradns = getAll(Brand);
// api/v1/brands/id
exports.getBrand = getOne(Brand);
// api/v1/brands/id
exports.createBrand = createOne(Brand);

exports.updateBrand = updateOne(Brand);

exports.deleteBrand = deleteOne(Brand);