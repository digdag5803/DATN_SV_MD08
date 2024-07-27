const Product = require("../models/products");
const Category = require("../models/categories");
const { formatPrice } = require("../utils");

class ProductController {
  async index(req, res) {
    const products = await Product.find()
      .populate("category")
      .sort("-createdAt")
      .exec();
    const productFormatted = products.map((it) => ({
      ...it.toJSON(),
      price: formatPrice(it.price),
    }));
    res.render("pages/products", {
      
      data: productFormatted,
    });
  }

  async add(req, res) {
    const categories = await Category.find().exec();
    res.render("pages/products/add", {
      categories,
    });
  }

  async store(req, res) {
    const { name, description, price, category, color, size } = req.body;
    const variants = color.map((it, index) => ({
      color: it,
      size: size[index],
    }));
    const thumbnail = req.files["thumbnail"][0].path;
    const images = req.files["images"].map((it) => it.path);

    const body = {
      name,
      description,
      price,
      category,
      variants,
      thumbnail,
      images,
    };

    const product = new Product(body);
    product
      .save()
      .then(() => {
        res.redirect("/products");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async edit(req, res) {
    const data = await Product.findById(req.params.id).exec();
    const categories = await Category.find().exec();
    res.render("pages/products/edit", {
      data,
      categories,
    });
  }

  async update(req, res, next) {
    const { name, description, price, category, color, size } = req.body;
    const variants = color.map((it, index) => ({
      color: it,
      size: size[index],
    }));
    const thumbnail = req.files?.["thumbnail"]?.[0].path;
    const images = req.files?.["images"]?.map((it) => it.path);

    const body = {
      name,
      description,
      price,
      category,
      variants,
      thumbnail,
      images,
    };

    Product.findByIdAndUpdate(req.params.id, body)
      .then(() => {
        res.redirect("/products");
      })
      .catch(next);
  }
}

module.exports = new ProductController();
