const dayjs = require("dayjs");
const Orders = require("../models/orders");
const OrderDetails = require("../models/orderDetails");
const OrderStatus = require("../models/orderStatus");
const { formatPrice } = require("../utils");

class OrderController {
  async index(req, res) {
    const orders = await Orders.find()
      .populate(["user_id", "status_id"])
      .sort("-order_date")
      .exec();

    const orderFormatted = orders.map((it) => ({
      ...it.toJSON(),
      total_amount: formatPrice(it.total_amount),
      order_date: dayjs(it.order_date).format("DD/MM/YYYY HH:mm:ss"),
    }));

    res.render("pages/orders", {
      data: orderFormatted,
    });
  }

  async showDetail(req, res) {
    const orderId = req.params.orderId;

    const order = await Orders.findById(orderId)
      .populate(["user_id", "status_id"])
      .exec();

    const orderDetails = (
      await OrderDetails.find().populate(["product_detail_id"]).exec()
    ).filter((it) => it.order_id._id == orderId);

    const orderStatus = await OrderStatus.find().exec();

    res.render("pages/orders/detail", {
      data: {
        orderDetails,
        order,
        orderStatus,
      },
    });
  }

  async updateStatus(req, res) {
    try {
      const { orderId, statusId } = req.params;

      await Orders.findByIdAndUpdate(orderId, { status_id: statusId }).exec();
      res.redirect("back");
    } catch (error) {
      console.log(eror);
    }
  }
}

module.exports = new OrderController();
