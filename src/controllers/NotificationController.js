const User = require("../models/users");
const Notification = require("../models/notifications");

class NotificationController {
  async sendNotification(req, res) {
    const { title, body, userIds } = req.body;

    try {
      const notifications = userIds.map((userId) => ({
        title,
        body,
        user: userId,
      }));

      await Notification.insertMany(notifications);
      res.json({
        message: "Send notification successfully",
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
      });
    }
    console.log(req.body);
  }

  async index(req, res) {
    const data = await User.find().exec();

    res.render("pages/notifications", {
      data,
    });
  }
}

module.exports = new NotificationController();
