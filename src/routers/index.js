const express = require("express");
const authRouter = require("./auth");
const categoryRouter = require("./categories");
const notificationRouter = require("./notifications");
const productRouter = require("./products");
const dashboardRouter = require("./dashboard");
const orderRouter = require("./orders");

const router = express.Router();

router.use("/", dashboardRouter);
router.use("/auth", authRouter);
router.use("/categories", categoryRouter);
router.use("/notifications", notificationRouter);
router.use("/products", productRouter);
router.use("/orders", orderRouter);

module.exports = router;
