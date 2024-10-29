const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
  {
    name: { 
        type: String, 
        required: true 
    },
    description: { 
        type: String 
    },
    menu: [{ 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Menu', 
      required: true 
    }]
  },
  { timestamps: true }
);

const CategoryModel = mongoose.model("Category", CategorySchema);
module.exports = CategoryModel;
