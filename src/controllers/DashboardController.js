const Orders = require("../models/orders");
const OrderStatus = require("../models/orderStatus");
const dayjs = require("dayjs");

class HomeController {
  async index(req, res) {
    const revenueBy7Days = await getRevenueBy7DaysLatest();

    const revenueByMonth = await getRevenueByMonth();

    const revenueByYear = await getRevenueByYear();

    res.render("pages/dashboard", {
      revenueBy7Days,
      revenueByMonth,
      revenueByYear,
    });
  }
}

const getRevenueBy7DaysLatest = async () => {
  try {
    const status = await OrderStatus.findOne({
      status_name: "Hoàn thành đơn hàng",
    });

    if (!status) {
      throw new Error("Status not found");
    }

    const endDate = dayjs();
    const startDate = endDate.subtract(6, "day");

    const revenueData = await Orders.aggregate([
      {
        $match: {
          status_id: status._id,
          order_date: {
            $gte: startDate.toDate(),
            $lt: endDate.add(1, "day").toDate(),
          },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$order_date" } },
          totalRevenue: { $sum: "$total_amount" },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    const resultMap = new Map();
    revenueData.forEach((item) => {
      resultMap.set(item._id, item.totalRevenue);
    });

    const result = [];
    for (
      let d = startDate;
      d.isBefore(endDate.add(1, "day"));
      d = d.add(1, "day")
    ) {
      const dateStr = d.format("YYYY-MM-DD");
      result.push({
        date: dateStr,
        totalRevenue: resultMap.get(dateStr) || 0,
      });
    }

    return result;
  } catch (error) {}
};

const getRevenueByMonth = async () => {
  try {
    const status = await OrderStatus.findOne({
      status_name: "Hoàn thành đơn hàng",
    });

    if (!status) {
      throw new Error("Status not found");
    }

    const startDate = dayjs().startOf("year").toDate();
    const endDate = dayjs().endOf("year").toDate();

    const revenueData = await Orders.aggregate([
      {
        $match: {
          status_id: status._id,
          order_date: { $gte: startDate, $lt: endDate },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m", date: "$order_date" } },
          totalRevenue: { $sum: "$total_amount" },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    const resultMap = new Map();
    revenueData.forEach((item) => {
      resultMap.set(item._id, item.totalRevenue);
    });

    const result = [];
    for (let month = 0; month < 12; month++) {
      const monthStr = dayjs().month(month).format("YYYY-MM");
      result.push({
        month: monthStr,
        totalRevenue: resultMap.get(monthStr) || 0,
      });
    }

    return result;
  } catch (error) {}
};

const getRevenueByYear = async () => {
  try {
    const status = await OrderStatus.findOne({
      status_name: "Hoàn thành đơn hàng",
    });

    if (!status) {
      throw new Error("Status not found");
    }

    const revenueData = await Orders.aggregate([
      {
        $match: {
          status_id: status._id,
        },
      },
      {
        $group: {
          _id: { $year: "$order_date" },
          totalRevenue: { $sum: "$total_amount" },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    const result = revenueData.map((item) => ({
      year: item._id,
      totalRevenue: item.totalRevenue,
    }));

    return result;
  } catch (error) {}
};

module.exports = new HomeController();
