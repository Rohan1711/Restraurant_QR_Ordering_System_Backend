// const cloudinary = require("cloudinary");
const { validationResult } = require("express-validator");
const AppErr = require("../Services/AppErr");
const RestaurantModel = require("../Model/Restaurant");
const TableModel = require("../Model/Table");
const mongoose = require("mongoose");

//----------------Create Restaurant -----------------------//

const createTable = async (req, res, next) => {
  try {
    //-------Validation Check--------------//
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return next(new AppErr(result.errors[0].msg, 403));
    }

    let { restaurantId, tableNumber, qrCodeUrl } = req.body;

    //--------Check restaurant -------------//
    let restaurantFound = await RestaurantModel.findById(restaurantId);
    if (!restaurantFound) {
      return next(new AppErr("restaurant Not Found", 404));
    }

    //---------create table-----------------//

    let newTable = await TableModel.create(req.body);
    return res.status(200).json({
      status: true,
      statuscode: 200,
      message: "Table created successfully",
      data: newTable,
    });
  } catch (error) {
    return next(new AppErr(error.message, 500));
  }
};

//-----------------Get All table ----------------------//

const GetAllTable = async (req, res, next) => {
  try {
    let table = await TableModel.find();
    if (!table) {
      return next(new AppErr("No table available", 404));
    }
    return res.status(200).json({
      status: true,
      statuscode: 200,
      message: "Fetched Restaurants successfully",
      totalCount: table.length,
      data: table,
    });
  } catch (error) {
    return next(new AppErr(error.message, 500));
  }
};

//-----------------Get Single table by id------------------//
const GetSingleTable = async (req, res, next) => {
  try {
    let { tableId } = req.params;

    // Check if the tableId is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(tableId)) {
      return next(new AppErr("Invalid table ID format", 400));
    }

    let table = await TableModel.findById(tableId);

    // Check if the table with the provided ID exists
    if (!table) {
      return next(new AppErr("table not found with the provided ID", 404));
    }

    return res.status(200).json({
      status: true,
      statuscode: 200,
      message: "Fetched table successfully",
      data: table,
    });
  } catch (error) {
    return next(new AppErr(error.message, 500));
  }
};

//----------------------Update table ----------------------//

const UpdateTable = async (req, res, next) => {
  try {
    //-------Validation Check--------------//
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return next(new AppErr(result.errors[0].msg, 403));
    }
    let { tableId } = req.params;

    // Check if the tableId is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(tableId)) {
      return next(new AppErr("Invalid table ID format", 400));
    }

    let updatedTable = await TableModel.findByIdAndUpdate(tableId, req.body, {
      new: true,
      runValidators: true,
    });

    // Check if the table with the provided ID was found and updated
    if (!updatedTable) {
      return next(new AppErr("Table not found with the provided ID", 404));
    }
    return res.status(200).json({
      status: true,
      statuscode: 200,
      message: "Table Updated successfully",
      data: updatedTable,
    });
  } catch (error) {
    return next(new AppErr(error.message, 500));
  }
};

//-----------------Get delete table by id------------------//
const GetDeleteTable = async (req, res, next) => {
  try {
    let { tableId } = req.params;

    // Check if the tableId is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(tableId)) {
      return next(new AppErr("Invalid table ID format", 400));
    }

    let table = await TableModel.findByIdAndDelete(tableId);

    // Check if the table with the provided ID exists
    if (!table) {
      return next(new AppErr("table not found with the provided ID", 404));
    }

    return res.status(200).json({
      status: true,
      statuscode: 200,
      message: "table Deleted successfully",
      data: table,
    });
  } catch (error) {
    return next(new AppErr(error.message, 500));
  }
};

module.exports = {
  createTable,
  GetAllTable,
  GetSingleTable,
  UpdateTable,
  GetDeleteTable,
};
