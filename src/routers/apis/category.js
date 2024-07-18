const express = require("express");
const CategoryAPI = require("../../APIs/CategoriesAPI");

const router = express.Router();

router.get("/", CategoryAPI.getAllCategories);

module.exports = router;
