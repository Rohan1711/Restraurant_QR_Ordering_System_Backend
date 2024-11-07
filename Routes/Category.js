const express = require("express");
const {
  createCategory,
  GetAllCategory,
  GetSingleCategory,
  UpdateCategory,
  GetDeleteCategory,
} = require("../Controller/Category");

const { body } = require("express-validator");
const CategoryRouter = express.Router();

CategoryRouter.post(
  "/add",
  body("name")
    .isString()
    .withMessage("Category name must be a string")
    .notEmpty()
    .withMessage("Restaurant name is required"),

  body("description")
    .optional()
    .isString()
    .withMessage("description must be a string"),
  createCategory
);

CategoryRouter.get("/getAll", GetAllCategory);

CategoryRouter.get("/getSingle/:categoryId", GetSingleCategory);

CategoryRouter.put(
  "/update/:categoryId",
  body("name")
    .isString()
    .withMessage("Category name must be a string")
    .notEmpty()
    .withMessage("Category name is required"),

  body("description")
    .optional()
    .isString()
    .withMessage("description must be a string"),
  UpdateCategory
);

CategoryRouter.delete("/delete/:categoryId", GetDeleteCategory);

module.exports = CategoryRouter;
