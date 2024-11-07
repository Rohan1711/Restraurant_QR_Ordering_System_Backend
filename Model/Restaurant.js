const mongoose = require("mongoose");

const RestaurantSchema = new mongoose.Schema(
  {
    restaurantName: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    subscriptionPlan: {
      type: String,
      required: true,
      enum: ["basic", "standard", "premium"], // Allowed values for subscriptionPlan
      default: "basic", // Default value if none is provided
    },

    themeColor: {
      type: String,
      enum: ["classic", "Modern"], // Allowed values for themeColor
      default: "classic", // Default theme if none is provided
    },
    logo: {
      type: String,
      default: "logo.png",
    },
    customization: {
      type: String,
    },
  },
  { timestamps: true }
);

const RestaurantModel = mongoose.model("Restaurant", RestaurantSchema);
module.exports = RestaurantModel;
