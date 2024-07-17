const { Schema, model, default: mongoose } = require("mongoose");

const orderSchema = new Schema(
  {
    order_id: {
      type: mongoose.Types.ObjectId,
      ref: "orders",
      required: true,
    },
    product_detail_id: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "products",
    },
    quantity: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    discount_amount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model("order_details", orderSchema);
