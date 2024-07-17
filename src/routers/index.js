const express = require("express");
const authRouter = require("./auth");
const categoryRouter = require("./categories");
const notificationRouter = require("./notifications");

const router = express.Router();

router.use("/auth", authRouter);
router.use("/categories", categoryRouter);
router.use("/notifications", notificationRouter);

module.exports = router;
