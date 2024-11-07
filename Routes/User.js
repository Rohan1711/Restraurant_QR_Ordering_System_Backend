const express = require("express");
const {
  GetUserProfile,
  updateUserProfile,
  updateUserPassword,
} = require("../Controller/User");

// const { body } = require("express-validator");
const { isUser } = require("../MiddleWare/IsUser");
const UserRouter = express.Router();

UserRouter.get("/profile", isUser, GetUserProfile);
UserRouter.put("/update", isUser, updateUserProfile);
UserRouter.put("/update/password", isUser, updateUserPassword);

module.exports = UserRouter;
