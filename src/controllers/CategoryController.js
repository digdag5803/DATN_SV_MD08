const Category = require("../models/categories");

class CategoryController {
  async index(req, res) {
    const categories = await Category.find().sort('-createdAt').exec();
    res.render("pages/categories", {
      data: categories,
    });
  }

  add(req, res) {
    res.render("pages/categories/add");
  }

  store(req, res) {
    req.body.image = req.file.path;
    const category = new Category(req.body);
    category
      .save()
      .then(() => {
        res.redirect("/categories");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async edit(req, res) {
    const data = await Category.findById(req.params.id).exec();
    res.render("pages/categories/edit", {
      data,
    });
  }

  async update(req, res, next) {
    if (req.file) {
      req.body.image = req.file.path;
    }

    Category.findByIdAndUpdate(req.params.id, req.body)
      .then(() => {
        res.redirect("/categories");
      })
      .catch(next);
  }
}

module.exports = new CategoryController();

