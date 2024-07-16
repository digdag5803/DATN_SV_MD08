const express = require("express");
const authRouter = require("./auth");
const categoryRouter = require("./categories");


const router = express.Router();

router.use("/auth", authRouter);
router.use("/categories", categoryRouter);

module.exports = router;
