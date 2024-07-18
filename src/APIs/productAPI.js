const Product = require("../models/products");
const Category = require("../models/categories");
const { formatPrice } = require("../utils");

class ProductAPI {
  // Thêm phương thức getAllProducts
  async getAllProducts(req, res) {
    try {
      const products = await Product.find()
        .populate("category")
        .sort("-createdAt")
        .exec();
      res.status(200).json(products);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Lỗi khi lấy danh sách sản phẩm", error });
    }
  }

  // Thêm phương thức getProductById
  async getProductById(req, res) {
    try {
      const product = await Product.findById(req.params.id)
        .populate("category")
        .exec();
      if (!product) {
        return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
      }
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ message: "Lỗi khi lấy sản phẩm", error });
    }
  }
}

module.exports = new ProductAPI();
