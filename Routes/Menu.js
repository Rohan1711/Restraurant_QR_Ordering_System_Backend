const express = require("express");
const {
  createMenu,
  GetAllMenu,
  GetSingleMenu,
  getMenuByRestaurant,
  getMenuByCategory,
  UpdateMenu,
  GetDeleteMenu,
} = require("../Controller/Menu");

const { body } = require("express-validator");
const MenuRouter = express.Router();

MenuRouter.post(
  "/add",
  body("menuName")
    .isString()
    .withMessage("Menu name must be a string")
    .notEmpty()
    .withMessage("Menu name is required"),

  body("price")
    .notEmpty()
    .withMessage("price is required")
    .isNumeric()
    .withMessage("price must be a Number"),

  body("description")
    .optional()
    .isString()
    .withMessage("description must be a string"),

  body("foodTags")
    .notEmpty()
    .withMessage("foodTags is required")
    .isString()
    .withMessage("foodTags must be a string"),

  body("category").notEmpty().withMessage("category is required"),
  createMenu
);

MenuRouter.get("/getAll", GetAllMenu);

MenuRouter.get("/getSingle/:menuId", GetSingleMenu);
MenuRouter.get("/getByRestaurant/:restaurantId", getMenuByRestaurant);
MenuRouter.get("/getByCategory/:categoryId", getMenuByCategory);

MenuRouter.put(
  "/update/:menuId",
  body("menuName")
    .optional()
    .isString()
    .withMessage("Menu name must be a string"),

  body("price").optional().isNumeric().withMessage("price must be a Number"),

  body("description")
    .optional()
    .isString()
    .withMessage("description must be a string"),

  body("foodTags")
    .optional()
    .isString()
    .withMessage("foodTags must be a string"),

  body("category").optional(),
  UpdateMenu
);

MenuRouter.delete("/delete/:menuId", GetDeleteMenu);

module.exports = MenuRouter;
