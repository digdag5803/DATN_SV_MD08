const express = require("express");
const CategoryController = require("../controllers/CategoryController");
const { storage } = require("../../storage/storage");
const multer = require("multer");
const upload = multer({ storage });

const router = express.Router();

router.get("/", CategoryController.index);
router.get("/add", CategoryController.add);
router.post("/add", upload.single("image"), CategoryController.store);
router.get("/:id/edit", CategoryController.edit);
router.put("/:id/edit", upload.single("image"), CategoryController.update);

module.exports = router;
