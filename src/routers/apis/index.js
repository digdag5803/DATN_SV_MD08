const express = require("express");
const authRouter = require("../apis/auth");

const router = express.Router();

router.use("/auth", authRouter);

module.exports = router;