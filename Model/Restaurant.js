const mongoose = require("mongoose");

const RestaurantSchema = new mongoose.Schema(
  {
    name: { 
        type: String, 
        required: true 
    },
    subscriptionPlan: {
      type: String,
      required: true,
    },
    themeColor: {
      type: String,
      default: "classic",
    },
    logo: {
      type: String,
    },
  },
  { timestamps: true }
);

const RestaurantModel = mongoose.model("Restaurant", RestaurantSchema);
module.exports = RestaurantModel;
