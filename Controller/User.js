const { validationResult } = require("express-validator");
const AppErr = require("../Services/AppErr");
const UserModel = require("../Model/User");
const RestaurantModel = require("../Model/Restaurant");
const bcrypt = require("bcrypt");

const mongoose = require("mongoose");

// // //---------get all User-------------------//

// const GetAllUser = async (req, res, next) => {
//   try {
//     let users = await UserModel.find();
//     return res.status(200).json({
//       status: true,
//       statuscode: 200,
//       message: "Fetched Users successfully",
//       data: users,
//     });
//   } catch (error) {
//     return next(new AppErr(error.message, 500));
//   }
// };

// //---------get all user by role-------------------//

// const GetAllUserByRole = async (req, res, next) => {
//   try {
//     let users = await UserModel.find({ role: req.params.role });
//     return res.status(200).json({
//       status: true,
//       statuscode: 200,
//       message: "Fetched Users successfully",
//       data: users,
//     });
//   } catch (error) {
//     return next(new AppErr(error.message, 500));
//   }
// };

// //---------get single user by role with id-------------------//

// const GetUserById = async (req, res, next) => {
//   try {
//     let user = await UserModel.findById(req.params.id);
//     return res.status(200).json({
//       status: true,
//       statuscode: 200,
//       message: "Fetched User successfully",
//       data: user,
//     });
//   } catch (error) {
//     return next(new AppErr(error.message, 500));
//   }
// };

//---------get user profile----------
const GetUserProfile = async (req, res, next) => {
  try {
    let user = await UserModel.findById(req.user).populate("restaurant");
    return res.status(200).json({
      status: true,
      statuscode: 200,
      message: "User Data fetched successfully",
      data: user,
    });
  } catch (error) {
    return next(new AppErr(error.message, 500));
  }
};

//--------- update user profile ----------
const updateUserProfile = async (req, res, next) => {
  try {
    //-------Validation Check--------------//
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return next(new AppErr(result.errors[0].msg, 403));
    }

    let { userName, mobileNumber, address } = req.body;

    let user = await UserModel.findById(req.user);
    if (!user) {
      return next(new AppErr("User not found", 404));
    }
    if (userName) user.userName = userName;
    if (mobileNumber) user.mobileNumber = mobileNumber;
    if (address) user.address = address;
    await user.save();

    return res.status(200).json({
      status: true,
      statuscode: 200,
      message: "User updated successfully",
      data: user,
    });
  } catch (error) {
    return next(new AppErr(error.message, 500));
  }
};

const updateUserPassword = async (req, res, next) => {
  try {
    // -------Validation Check--------------//
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return next(new AppErr(result.errors[0].msg, 403));
    }

    const { oldPassword, newPassword } = req.body; // extract current and new password from  requesr body

    // check user is present or not find user by userID
    let user = await UserModel.findById(req.user);

    // get data from user
    if (!oldPassword || !newPassword) {
      return next(new AppErr("Please provide Old or new password", 500));
    }
    // password does not match return error
    const isMatch = await bcrypt.compareSync(oldPassword, user.password);

    if (!isMatch) {
      return next(new AppErr("Invalid Old Password", 500));
    }

    //-------password hashing---------//
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // update password
    user.password = hashedPassword;
    await user.save();

    return res.status(200).json({
      status: true,
      statuscode: 200,
      message: "User password updated successfully",
      data: user,
    });
  } catch (error) {
    return next(new AppErr(error.message, 500));
  }
};

module.exports = {
  GetUserProfile,
  updateUserProfile,
  updateUserPassword,
};
