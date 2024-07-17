const { Schema, model } = require("mongoose");

const orderStatusSchema = new Schema(
  {
    status_name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model("order_status", orderStatusSchema);
