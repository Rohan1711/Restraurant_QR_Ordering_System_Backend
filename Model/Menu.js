const mongoose = require("mongoose");

const MenuSchema = new mongoose.Schema(
  {
  restaurantId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Restaurant', 
      required: true 
  },
  item: [{
    name: { type: String, 
      required: true
    },
    price: { 
      type: Number, 
      required: true 
    },
    description: { 
      type: String 
    },
    image: { 
      type: String 
    },
  }],
  isAvailable: { 
    type: Boolean, 
    default: true 
  },
  category: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Category', 
    required: true 
  },

  },
  { timestamps: true }
);

const MenuModel = mongoose.model("Menu", MenuSchema);
module.exports = MenuModel;
