const User = require("../models/User");
const { deleteOne, updateOne, createOne, getOne, getAll } = require("./handlersFactory");

// api/v1/users/id
exports.getUsers = getAll(User);
// api/v1/users/id
exports.getUser = getOne(User);
// api/v1/users/id
exports.createUser = createOne(User);

exports.updateUser = updateOne(User);

exports.deleteUser = deleteOne(User);