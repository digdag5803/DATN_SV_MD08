const { Schema, model, default: mongoose } = require("mongoose");

const notificationSchema = new Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "users",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    status: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = model("notifications", notificationSchema);
