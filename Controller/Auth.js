const { validationResult } = require("express-validator");
const AppErr = require("../Services/AppErr");
const UserModel = require("../Model/User");
const RestaurantModel = require("../Model/Restaurant");
const GenerateToken = require("../Services/Jwt/GenerteToken");
const bcrypt = require("bcrypt");

const mongoose = require("mongoose");

//=========user register
const userRegister = async (req, res, next) => {
  try {
    const {
      userName,
      restaurant,
      role,
      email,
      password,
      mobileNumber,
      address,
    } = req.body;

    //-------Validation Check--------------//
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return next(new AppErr(result.errors[0].msg, 403));
    }

    //=======Check existing user=====
    const existing = await UserModel.findOne({ email: email });
    if (existing) {
      return next(new AppErr("Email already exists", 403));
    }

    //------------Check restaurant -----------//
    let restaurantData = await RestaurantModel.findById(restaurant);
    if (!restaurantData) {
      return next(new AppErr("Restaurant not found", 404));
    }
    if (!Array.isArray(req.body.restaurant)) {
      req.body.restaurant = [];
    }
    req.body.restaurant.push(restaurantData._id);

    //-------password hashing---------//
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //-------add hash password---------//
    req.body.password = hashedPassword;

    //================register user=====================//
    const newUser = await UserModel.create(req.body);

    return res.status(200).json({
      status: true,
      statuscode: 200,
      message: "User created successfully",
      data: newUser,
    });
  } catch (error) {
    return next(new AppErr(error.message, 500));
  }
};

//-------------Login User-----------//

const userLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    //-------Validation Check--------------//
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return next(new AppErr(result.errors[0].msg, 403));
    }

    //------------Check user-----
    const user = await UserModel.findOne({ email });
    if (!user) {
      return next(new AppErr("User not found", 404));
    }

    //------------Check password-----
    const isMatch = await bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      return next(new AppErr("Invalid username or password", 403));
    }

    //--------------Generate Token-----------------//
    const payload = { id: user._id };
    const token = GenerateToken(payload);

    return res.status(200).json({
      status: true,
      statuscode: 200,
      message: "Login successful",
      token: token,
      user: user,
    });
  } catch (error) {
    return next(new AppErr(error.message, 500));
  }
};

module.exports = {
  userRegister,
  userLogin,
};
