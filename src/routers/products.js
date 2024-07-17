const express = require("express");
const ProductController = require("../controllers/ProductController");
const { storage } = require("../../storage/storage");
const multer = require("multer");
const upload = multer({ storage });

const router = express.Router();

router.get("/", ProductController.index);
router.get("/add", ProductController.add);
router.post(
  "/add",
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "images", maxCount: 10 },
  ]),
  ProductController.store
);
router.get("/:id/edit", ProductController.edit);
router.put(
  "/:id/edit",
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "images", maxCount: 10 },
  ]),
  ProductController.update
);

module.exports = router;
