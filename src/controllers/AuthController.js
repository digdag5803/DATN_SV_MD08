const User = require("../models/users");
const bcrypt = require("bcrypt");

class AuthController {
  index(req, res) {
    const isLoggedIn = req.session.isLoggedIn;
    if (isLoggedIn) {
      return res.redirect("/");
    }

    res.render("pages/sign-in", {
      layout: "authLayout",
      data: {},
      errorMsg: "",
    });
  }

  async signIn(req, res) {
    let errorMsg;
    const { email, password } = req.body;

    const findUser = await User.findOne({ email }).exec();

    if (!findUser) {
      errorMsg = "Không tìm thấy tài khoản";
    } else {
      const isPasswordValid = await bcrypt.compare(password, findUser.password);
      if (!isPasswordValid) {
        errorMsg = "Mật khẩu không chính xác";
      } else if (findUser.role !== "admin") {

        errorMsg = "Bạn không có quyền truy cập!";
      } else {
        errorMsg = "";

        
      }
    }

    if (!errorMsg) {
      req.session.user = findUser;
      req.session.isLoggedIn = true;

      return res.redirect("/");
    }

    res.render("pages/sign-in", {
      layout: "authLayout",
      data: req.body,
      errorMsg,
    });
  }

  signOut(req, res) {
    req.session.isLoggedIn = false;
    req.session.user = {};

    res.redirect("/");
  }
}

module.exports = new AuthController();
