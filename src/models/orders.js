const { Schema, model, default: mongoose } = require("mongoose");
require("./orderStatus");

const orderSchema = new Schema(
  {
    user_id: {
      type: mongoose.Types.ObjectId,
      ref: "users",
      required: true,
    },
    order_date: {
      type: String,
      required: true,
    },
    total_amount: {
      type: Number,
      required: true,
    },
    shipping_address_id: {
      type: String,
    },
    status_id: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "order_status",
    },
    delivered_address: {
      type: String,
      required: true,
    },
    payment_method_id: {
      type: String,
    },
    payment_status: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model("orders", orderSchema);
