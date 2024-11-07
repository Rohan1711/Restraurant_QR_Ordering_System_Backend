const express = require("express");
const {
  createTable,
  GetAllTable,
  GetSingleTable,
  UpdateTable,
  GetDeleteTable,
} = require("../Controller/Table");

const { body } = require("express-validator");
const TableRouter = express.Router();

TableRouter.post(
  "/add",
  body("tableNumber")
    .isString()
    .withMessage("table number must be a string")
    .notEmpty()
    .withMessage("table number is required"),

  body("qrCodeUrl")
    .isString()
    .withMessage("qrCodeUrl must be a string")
    .notEmpty()
    .withMessage("qrCodeUrl is required"),
  createTable
);

TableRouter.get("/getAll", GetAllTable);

TableRouter.get("/getSingle/:tableId", GetSingleTable);

TableRouter.put(
  "/update/:tableId",
  body("tableNumber")
    .isString()
    .withMessage("table number must be a string")
    .notEmpty()
    .withMessage("table number is required"),

  body("qrCodeUrl")
    .isString()
    .withMessage("qrCodeUrl must be a string")
    .notEmpty()
    .withMessage("qrCodeUrl is required"),
  UpdateTable
);
TableRouter.delete("/delete/:tableId", GetDeleteTable);

module.exports = TableRouter;
