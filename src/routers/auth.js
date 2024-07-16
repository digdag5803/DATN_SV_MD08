const express = require("express");
const AuthController = require("../controllers/AuthController");

const router = express.Router();

router.get("/sign-in", AuthController.index);
router.get("/sign-out", AuthController.signOut);
router.post("/sign-in", AuthController.signIn);

module.exports = router;
