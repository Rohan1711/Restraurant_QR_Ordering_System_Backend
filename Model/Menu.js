const mongoose = require("mongoose");

const MenuSchema = new mongoose.Schema(
  {
    menuName: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    description: {
      type: String,
    },

    foodTags: {
      type: String,
      required: true,
    },

    image: {
      type: String,
    },

    isAvailable: {
      type: Boolean,
      default: true,
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
    },
  },
  { timestamps: true }
);

const MenuModel = mongoose.model("Menu", MenuSchema);
module.exports = MenuModel;
