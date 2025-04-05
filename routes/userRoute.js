const express = require("express");
const {
  getUser,
  getUsers,
  createUser,
  updateUser,
  deleteUser
} = require("../services/userService");
// const { getUserValidator, createUserValidator,updateUserValidator,deleteUserValidator } = require("../utiles/validators/brandValidator");

const router = express.Router();
router
  .route("/")
  .get(getUsers)
  .post(createUser);
router
  .route("/:id")
  .get( getUser)
  .put( updateUser)
  .delete(deleteUser);

module.exports = router;
