const express = require("express");
const ProductController = require("../../APIs/productAPI");

const router = express.Router();

router.get("/", ProductController.getAllProducts);
router.get("/:id", ProductController.getProductById);

module.exports = router;
