const Category = require("../models/categories");

class CategoryAPI {
  // Thêm phương thức getAllCategories
  async getAllCategories(req, res) {
    try {
      const categories = await Category.find().sort("-createdAt").exec();
      res.status(200).json(categories);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Lỗi khi lấy danh sách categories", error });
    }
  }
}

module.exports = new CategoryAPI();
