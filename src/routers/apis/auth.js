const express = require("express");
const AuthAPI = require("../../APIs/AuthAPI");

const router = express.Router();

router.post("/register", AuthAPI.register);
router.get("/login", AuthAPI.login);
router.put("/:id", AuthAPI.updateUser);
router.get("/:id", AuthAPI.getUserById);

module.exports = router;
