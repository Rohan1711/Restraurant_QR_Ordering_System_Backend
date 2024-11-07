const express = require("express");
const {
  createRestaurant,
  GetAllRestaurant,
  GetSingleRestaurant,
  UpdateRestaurant,
  GetDeleteRestaurant,
} = require("../Controller/Restaurant");

const { body } = require("express-validator");
const RestaurantRouter = express.Router();

RestaurantRouter.post(
  "/add",
  body("restaurantName")
    .isString()
    .withMessage("Restaurant name must be a string")
    .notEmpty()
    .withMessage("Restaurant name is required"),

  body("address")
    .isString()
    .withMessage("Address must be a string")
    .notEmpty()
    .withMessage("Address is required"),

  body("subscriptionPlan")
    .isString()
    .withMessage("Subscription plan must be a string")
    .isIn(["basic", "standard", "premium"])
    .withMessage(
      "Subscription plan must be one of the following: basic, standard, premium"
    ),

  body("themeColor")
    .optional()
    .isString()
    .withMessage("Theme color must be a string")
    .isIn(["classic", "Modern"])
    .withMessage("Theme color must be either 'classic' or 'Modern'"),

  body("logo").optional().isString().withMessage("Logo URL must be a string"),

  body("customization")
    .optional()
    .isString()
    .withMessage("Customization must be a string"),
  createRestaurant
);

RestaurantRouter.get("/getAll", GetAllRestaurant);

RestaurantRouter.get("/getSingle/:restaurantId", GetSingleRestaurant);

RestaurantRouter.put(
  "/update/:restaurantId",
  body("restaurantName")
    .isString()
    .withMessage("Restaurant name must be a string")
    .notEmpty()
    .withMessage("Restaurant name is required"),

  body("address")
    .isString()
    .withMessage("Address must be a string")
    .notEmpty()
    .withMessage("Address is required"),

  body("subscriptionPlan")
    .isString()
    .withMessage("Subscription plan must be a string")
    .isIn(["basic", "standard", "premium"])
    .withMessage(
      "Subscription plan must be one of the following: basic, standard, premium"
    ),

  body("themeColor")
    .optional()
    .isString()
    .withMessage("Theme color must be a string")
    .isIn(["classic", "Modern"])
    .withMessage("Theme color must be either 'classic' or 'Modern'"),

  body("logo").optional().isString().withMessage("Logo URL must be a string"),

  body("customization")
    .optional()
    .isString()
    .withMessage("Customization must be a string"),
  UpdateRestaurant
);
RestaurantRouter.delete("/delete/:restaurantId", GetDeleteRestaurant);

module.exports = RestaurantRouter;
