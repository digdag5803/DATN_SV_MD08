const express = require("express");
const authRouter = require("../apis/auth");
const categoryRouter = require("../apis/category");
const productRouter = require("../apis/product");

const router = express.Router();

router.use("/auth", authRouter);
router.use("/categories", categoryRouter);
router.use("/products", productRouter);

module.exports = router;
