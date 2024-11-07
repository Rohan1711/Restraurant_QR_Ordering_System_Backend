const express = require("express");
const { placeOrder, cancelOrder, modifyOrder } = require("../Controller/Order");

const { body } = require("express-validator");
const OrderRouter = express.Router();

OrderRouter.post(
  "/placeOrder",

  body("restaurantId").notEmpty().withMessage("restaurant is required"),
  body("tableId").notEmpty().withMessage("table id is required"),
  body("items").notEmpty().withMessage("items is required"),

  placeOrder
);

// MenuRouter.get("/getAll", GetAllMenu);

// MenuRouter.get("/getSingle/:menuId", GetSingleMenu);
// MenuRouter.get("/getByRestaurant/:restaurantId", getMenuByRestaurant);
// MenuRouter.get("/getByCategory/:categoryId", getMenuByCategory);

// MenuRouter.put(
//   "/update/:menuId",
//   body("menuName")
//     .optional()
//     .isString()
//     .withMessage("Menu name must be a string"),

//   body("price").optional().isNumeric().withMessage("price must be a Number"),

//   body("description")
//     .optional()
//     .isString()
//     .withMessage("description must be a string"),

//   body("foodTags")
//     .optional()
//     .isString()
//     .withMessage("foodTags must be a string"),

//   body("category").optional(),
//   UpdateMenu
// );

// MenuRouter.delete("/delete/:menuId", GetDeleteMenu);

module.exports = OrderRouter;
