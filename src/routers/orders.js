const express = require("express");
const OrderController = require("../controllers/OrderController");

const router = express.Router();

router.get("/", OrderController.index);
router.get("/:orderId/view", OrderController.showDetail);
router.get("/:orderId/:statusId/update-status", OrderController.updateStatus);

module.exports = router;
