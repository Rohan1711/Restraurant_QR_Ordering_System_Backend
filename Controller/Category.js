const { validationResult } = require("express-validator");
const AppErr = require("../Services/AppErr");
const CategoryModel = require("../Model/Category");
const mongoose = require("mongoose");
const MenuModel = require("../Model/Menu");

//----------create category---------------
const createCategory = async (req, res, next) => {
  try {
    //-------Validation Check--------------//
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return next(new AppErr(result.errors[0].msg, 403));
    }

    let { name, menu, description, image } = req.body;

    // // ---------Check category name---------//

    if (!name) {
      return next(new AppErr("Please provide Category Name", 500));
    }

    //---------create category-----------------//

    let newCategory = await CategoryModel.create(req.body);
    return res.status(200).json({
      status: true,
      statuscode: 200,
      message: "Category created successfully",
      data: newCategory,
    });
  } catch (error) {
    return next(new AppErr(error.message, 500));
  }
};

//-----------------Get All category ----------------------//

const GetAllCategory = async (req, res, next) => {
  try {
    let categories = await CategoryModel.find();
    if (!categories) {
      return next(new AppErr("No Category available", 404));
    }
    return res.status(200).json({
      status: true,
      statuscode: 200,
      message: "Fetched categories successfully",
      totalCount: categories.length,
      data: categories,
    });
  } catch (error) {
    return next(new AppErr(error.message, 500));
  }
};

//-----------------Get category by id ----------------------//

const GetSingleCategory = async (req, res, next) => {
  try {
    let { categoryId } = req.params;

    // Check if the categoryId is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
      return next(new AppErr("Invalid category ID format", 400));
    }

    let category = await CategoryModel.findById(categoryId)
      .populate("menu")
      .lean();

    // Check if the category with the provided ID exists
    if (!category) {
      return next(new AppErr("Category not found with the provided ID", 404));
    }

    return res.status(200).json({
      status: true,
      statuscode: 200,
      message: "Fetched Category successfully",
      data: category,
    });
  } catch (error) {
    return next(new AppErr(error.message, 500));
  }
};

//----------------------Update Category ----------------------//

const UpdateCategory = async (req, res, next) => {
  try {
    //-------Validation Check--------------//
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return next(new AppErr(result.errors[0].msg, 403));
    }
    let { categoryId } = req.params;

    // Check if the CategoryId is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
      return next(new AppErr("Invalid category ID format", 400));
    }

    let updatedCategory = await CategoryModel.findByIdAndUpdate(
      categoryId,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    // Check if the Category with the provided ID was found and updated
    if (!updatedCategory) {
      return next(new AppErr("Category not found with the provided ID", 404));
    }
    return res.status(200).json({
      status: true,
      statuscode: 200,
      message: "Category Updated successfully",
      data: updatedCategory,
    });
  } catch (error) {
    return next(new AppErr(error.message, 500));
  }
};

//-----------------Get delete by id------------------//
const GetDeleteCategory = async (req, res, next) => {
  try {
    let { categoryId } = req.params;

    // Check if the categoryId is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
      return next(new AppErr("Invalid Category ID format", 400));
    }

    let category = await CategoryModel.findByIdAndDelete(categoryId);

    // Check if the Category with the provided ID exists
    if (!category) {
      return next(new AppErr("Category not found with the provided ID", 404));
    }

    return res.status(200).json({
      status: true,
      statuscode: 200,
      message: "Category Deleted successfully",
      data: category,
    });
  } catch (error) {
    return next(new AppErr(error.message, 500));
  }
};

module.exports = {
  createCategory,
  GetAllCategory,
  GetSingleCategory,
  UpdateCategory,
  GetDeleteCategory,
};
