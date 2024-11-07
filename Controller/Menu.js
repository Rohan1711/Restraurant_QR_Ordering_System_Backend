const { validationResult } = require("express-validator");
const AppErr = require("../Services/AppErr");
const MenuModel = require("../Model/Menu");
const mongoose = require("mongoose");
const RestaurantModel = require("../Model/Restaurant");
const CategoryModel = require("../Model/Category");

//----------create menu---------------
const createMenu = async (req, res, next) => {
  try {
    //-------Validation Check--------------//
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return next(new AppErr(result.errors[0].msg, 403));
    }

    let { menuName, price, foodTags, category, restaurant } = req.body;

    //--------Check restaurant -------------//
    let restaurantFound = await RestaurantModel.findById(restaurant);
    if (!restaurantFound) {
      return next(new AppErr("restaurant Not Found", 404));
    }
    //-------Check Category------------//
    let CategoryFound = await CategoryModel.findById(category);
    if (!CategoryFound) {
      return next(new AppErr("Category Not Found", 404));
    }

    //---------create Menu-----------------//

    let newMenu = await MenuModel.create(req.body);
    CategoryFound.menu.push(newMenu._id);
    await CategoryFound.save();

    return res.status(200).json({
      status: true,
      statuscode: 200,
      message: "Menu created successfully",
      data: newMenu,
    });
  } catch (error) {
    return next(new AppErr(error.message, 500));
  }
};

//-----------------Get All menu ----------------------//

const GetAllMenu = async (req, res, next) => {
  try {
    let menus = await MenuModel.find();
    if (!menus || menus.length === 0) {
      return next(new AppErr("No menu available", 404));
    }
    return res.status(200).json({
      status: true,
      statuscode: 200,
      message: "Fetched menus successfully",
      totalCount: menus.length,
      data: menus,
    });
  } catch (error) {
    return next(new AppErr(error.message, 500));
  }
};

//-----------------Get menu by id ----------------------//

const GetSingleMenu = async (req, res, next) => {
  try {
    let { menuId } = req.params;

    // Check if the menuId is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(menuId)) {
      return next(new AppErr("Invalid menu ID format", 400));
    }

    let menu = await MenuModel.findById(menuId).populate("category");

    // Check if the menu with the provided ID exists
    if (!menu) {
      return next(new AppErr("Menu not found with the provided ID", 404));
    }

    return res.status(200).json({
      status: true,
      statuscode: 200,
      message: "Fetched Menu successfully",
      data: menu,
    });
  } catch (error) {
    return next(new AppErr(error.message, 500));
  }
};

//-----------------Get menu by restaurant id ----------------------//

const getMenuByRestaurant = async (req, res, next) => {
  try {
    let { restaurantId } = req.params;

    // Check if the restaurantId is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(restaurantId)) {
      return next(new AppErr("Invalid restaurant ID format", 400));
    }

    let menu = await MenuModel.find({ restaurant: restaurantId }).populate(
      "category"
    );

    // Check if the menu with the provided restaurant Id exists
    if (!menu) {
      return next(
        new AppErr("Menu not found with the provided restaurant ID", 404)
      );
    }

    return res.status(200).json({
      status: true,
      statuscode: 200,
      message: "Fetched Menu successfully",
      data: menu,
    });
  } catch (error) {
    return next(new AppErr(error.message, 500));
  }
};

//-----------------Get menu by category id ----------------------//

const getMenuByCategory = async (req, res, next) => {
  try {
    let { categoryId } = req.params;

    // Check if the categoryId is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
      return next(new AppErr("Invalid restaurant ID format", 400));
    }

    let menu = await MenuModel.find({ category: categoryId });

    // Check if the menu with the provided category Id exists
    if (!menu) {
      return next(
        new AppErr("Menu not found with the provided category ID", 404)
      );
    }

    return res.status(200).json({
      status: true,
      statuscode: 200,
      message: "Fetched Menu successfully",
      data: menu,
    });
  } catch (error) {
    return next(new AppErr(error.message, 500));
  }
};

//----------------------Update Menu ----------------------//

const UpdateMenu = async (req, res, next) => {
  try {
    //-------Validation Check--------------//
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return next(new AppErr(result.errors[0].msg, 403));
    }

    let { menuName, price, foodTags, category, restaurant } = req.body;
    let { menuId } = req.params;

    // Check if the menuId is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(menuId)) {
      return next(new AppErr("Invalid menu ID format", 400));
    }
    //-----------Find Old Menu -------------//
    let oldMenu = await MenuModel.findById(menuId);
    if (!oldMenu) {
      return next(new AppErr("menu not found", 404));
    }

    //--------Check restaurant -------------//
    let restaurantFound = await RestaurantModel.findById(restaurant);
    if (!restaurantFound) {
      return next(new AppErr("restaurant Not Found", 404));
    }
    //-------Check Category------------//
    let CategoryFound = await CategoryModel.findById(category);
    if (!CategoryFound) {
      return next(new AppErr("Category Not Found", 404));
    }

    let updatedMenu = await MenuModel.findByIdAndUpdate(menuId, req.body, {
      new: true,
      runValidators: true,
    });

    if (!CategoryFound.menu.includes(updatedMenu._id)) {
      CategoryFound.menu.filter((item) => item !== oldMenu._id);
      CategoryFound.menu.push(menu._id);
    }
    await CategoryFound.save();

    // Check if the Category with the provided ID was found and updated
    if (!updatedMenu) {
      return next(new AppErr("Menu not found with the provided ID", 404));
    }
    return res.status(200).json({
      status: true,
      statuscode: 200,
      message: "Menu Updated successfully",
      data: updatedMenu,
    });
  } catch (error) {
    return next(new AppErr(error.message, 500));
  }
};

//-----------------delete menu by id------------------//
const GetDeleteMenu = async (req, res, next) => {
  try {
    let { menuId } = req.params;

    // Check if the menu id is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(menuId)) {
      return next(new AppErr("Invalid menu ID format", 400));
    }
    //-----------Find the Menu-------------//
    let menu = await MenuModel.findById(menuId);
    if (!menu) {
      return next(new AppErr("Menu not found with the provided ID", 404));
    }

    //-------Check Category------------//
    let CategoryFound = await CategoryModel.findById(menu.category);

    if (!CategoryFound) {
      return next(new AppErr("Category Not Found", 404));
    }
    // Remove the menu item from the category’s menu array
    if (!CategoryFound.menu.includes(menu._id)) {
      CategoryFound.menu.filter((item) => item.toString() !== menu._id);
    }
    await CategoryFound.save();
    // Delete the menu item
    await MenuModel.findByIdAndDelete(menuId);

    return res.status(200).json({
      status: true,
      statuscode: 200,
      message: "Menu Deleted successfully",
      data: menu,
    });
  } catch (error) {
    return next(new AppErr(error.message, 500));
  }
};

module.exports = {
  createMenu,
  GetAllMenu,
  GetSingleMenu,
  getMenuByRestaurant,
  getMenuByCategory,
  UpdateMenu,
  GetDeleteMenu,
};
