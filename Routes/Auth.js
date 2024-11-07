const express = require("express");
const { userRegister, userLogin } = require("../Controller/Auth");

const { body } = require("express-validator");
// const { isUser } = require("../MiddleWare/IsUser");
const AuthRouter = express.Router();

//-----------Route--------

//--------Register-----
AuthRouter.post(
  "/register",
  body("userName")
    .isString()
    .withMessage("user name must be a string")
    .notEmpty()
    .withMessage("user name name is required"),

  body("restaurant").notEmpty().withMessage("restaurant is required"),

  body("address")
    .isString()
    .withMessage("Address must be a string")
    .notEmpty()
    .withMessage("Address is required"),

  body("role")
    .optional()
    .isString()
    .withMessage("user role must be a string")
    .isIn(["admin", "staff", "chef"]),

  body("mobileNumber")
    .notEmpty()
    .isLength({ min: 10, max: 10 })
    .withMessage("mobile Number must be a Number"),

  body("email").notEmpty().isEmail().withMessage("please enter valid EmailID"),

  body("password").notEmpty().withMessage("password must required"),
  userRegister
);

//---------login -----

AuthRouter.post(
  "/login",
  body("email").notEmpty().withMessage("email/userID is Required"),
  body("password").notEmpty().withMessage("password is Required"),
  userLogin
);

module.exports = AuthRouter;
