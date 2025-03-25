const express = require("express");
const { getCatgeories, createCatgeory } = require("../services/categoryService");

const router = express.Router();

router.route('/').get(getCatgeories).post(createCatgeory);

module.exports = router;    