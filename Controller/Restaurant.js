// const cloudinary = require("cloudinary");
const { validationResult } = require("express-validator");
const AppErr = require("../Services/AppErr");
const RestaurantModel = require("../Model/Restaurant");
const mongoose = require("mongoose");

//----------------Create Restaurant -----------------------//

const createRestaurant = async (req, res, next) => {
  try {
    //-------Validation Check--------------//
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return next(new AppErr(result.errors[0].msg, 403));
    }

    let {
      restaurantName,
      address,
      subscriptionPlan,
      themeColor,
      logo,
      customization,
    } = req.body;

    // // ---------Check restaurant Name,address, subscriptionPlan----------//

    if (!restaurantName || !address || !subscriptionPlan) {
      return next(
        new AppErr(
          "Please provide Restaurant Name,address, subscription Plan",
          500
        )
      );
    }

    //---------create Restaurant-----------------//

    let newRestaurant = await RestaurantModel.create(req.body);
    return res.status(200).json({
      status: true,
      statuscode: 200,
      message: "Restaurant created successfully",
      data: newRestaurant,
    });
  } catch (error) {
    return next(new AppErr(error.message, 500));
  }
};

//-----------------Get All Restaurant ----------------------//

const GetAllRestaurant = async (req, res, next) => {
  try {
    let restaurant = await RestaurantModel.find();
    if (!restaurant) {
      return next(new AppErr("No Restaurant available", 404));
    }
    return res.status(200).json({
      status: true,
      statuscode: 200,
      message: "Fetched Restaurants successfully",
      totalCount: restaurant.length,
      data: restaurant,
    });
  } catch (error) {
    return next(new AppErr(error.message, 500));
  }
};

//-----------------Get Single Restaurant by id------------------//
const GetSingleRestaurant = async (req, res, next) => {
  try {
    let { restaurantId } = req.params;

    // Check if the restaurantId is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(restaurantId)) {
      return next(new AppErr("Invalid Restaurant ID format", 400));
    }

    let restaurant = await RestaurantModel.findById(restaurantId);

    // Check if the restaurant with the provided ID exists
    if (!restaurant) {
      return next(new AppErr("Restaurant not found with the provided ID", 404));
    }

    return res.status(200).json({
      status: true,
      statuscode: 200,
      message: "Fetched Restaurant successfully",
      data: restaurant,
    });
  } catch (error) {
    return next(new AppErr(error.message, 500));
  }
};

//----------------------Update restaurant ----------------------//

const UpdateRestaurant = async (req, res, next) => {
  try {
    //-------Validation Check--------------//
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return next(new AppErr(result.errors[0].msg, 403));
    }
    let { restaurantId } = req.params;

    // Check if the restaurantId is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(restaurantId)) {
      return next(new AppErr("Invalid Restaurant ID format", 400));
    }

    let updatedRestaurant = await RestaurantModel.findByIdAndUpdate(
      restaurantId,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    // Check if the restaurant with the provided ID was found and updated
    if (!updatedRestaurant) {
      return next(new AppErr("Restaurant not found with the provided ID", 404));
    }
    return res.status(200).json({
      status: true,
      statuscode: 200,
      message: "Restaurant Updated successfully",
      data: updatedRestaurant,
    });
  } catch (error) {
    return next(new AppErr(error.message, 500));
  }
};

//-----------------Get Single Restaurant by id------------------//
const GetDeleteRestaurant = async (req, res, next) => {
  try {
    let { restaurantId } = req.params;

    // Check if the restaurantId is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(restaurantId)) {
      return next(new AppErr("Invalid Restaurant ID format", 400));
    }

    let restaurant = await RestaurantModel.findByIdAndDelete(restaurantId);

    // Check if the restaurant with the provided ID exists
    if (!restaurant) {
      return next(new AppErr("Restaurant not found with the provided ID", 404));
    }

    return res.status(200).json({
      status: true,
      statuscode: 200,
      message: "Restaurant Deleted successfully",
      data: restaurant,
    });
  } catch (error) {
    return next(new AppErr(error.message, 500));
  }
};

module.exports = {
  createRestaurant,
  GetAllRestaurant,
  GetSingleRestaurant,
  UpdateRestaurant,
  GetDeleteRestaurant,
};
