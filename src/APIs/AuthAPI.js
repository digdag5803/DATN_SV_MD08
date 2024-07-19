const User = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const { SECRET_CODE } = process.env;

class AuthAPI {
  async register(req, res) {
    const { username, password, email, full_name, phone, address, avatar } =
      req.body;

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        username,
        password: hashedPassword,
        email,
        full_name,
        phone,
        address,
        avatar,
      });

      await newUser.save();

      res.status(201).json({ message: "Đăng ký thành công!", user: newUser });
    } catch (error) {
      res.status(500).json({ message: "Có lỗi xảy ra", error });
    }
  }

  async login(req, res) {
    const { email, password } = req.body;

    try {
      const findUser = await User.findOne({ email }).exec();

      if (!findUser) {
        return res.status(404).json({ message: "Không tìm thấy tài khoản" });
      }

      const isPasswordValid = await bcrypt.compare(password, findUser.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Mật khẩu không chính xác" });
      }

      const token = jwt.sign(
        { userId: findUser._id, role: findUser.role },
        SECRET_CODE,
        { expiresIn: "1h" }
      );

      res.status(200).json({ message: "Đăng nhập thành công", token });
    } catch (error) {
      res.status(500).json({ message: "Có lỗi xảy ra", error });
    }
  }

  async updateUser(req, res) {
    const { id } = req.params;
    const { username, email, full_name, phone, address, avatar } = req.body;

    try {
      const updatedUser = await User.findByIdAndUpdate(
        id,
        { username, email, full_name, phone, address, avatar },
        { new: true }
      );

      console.log(updatedUser);
      if (!updatedUser) {
        return res.status(404).json({ message: "Không tìm thấy người dùng" });
      }

      res
        .status(200)
        .json({ message: "Cập nhật thành công", user: updatedUser });
    } catch (error) {
      res.status(500).json({ message: "Có lỗi xảy ra", error });
    }
  }

  async getUserById(req, res) {
    const { id } = req.params;

    try {
      const user = await User.findById(id);

      if (!user) {
        return res.status(404).json({ message: "Không tìm thấy người dùng" });
      }

      res.status(200).json({ user });
    } catch (error) {
      res.status(500).json({ message: "Có lỗi xảy ra", error });
    }
  }
}

module.exports = new AuthAPI();
