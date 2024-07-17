const express = require("express");
const NotificationsController = require("../controllers/NotificationController");

const router = express.Router();

router.get("/", NotificationsController.index);
router.post("/", NotificationsController.sendNotification);

module.exports = router;
