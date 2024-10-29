const mongoose = require("mongoose");

const TableSchema = new mongoose.Schema(
  {
    restaurantId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Restaurant', 
        required: true 
    },
    tableNumber: { 
        type: String, 
        required: true 
    },
    qrCodeUrl: { 
        type: String, 
        required: true 
    }
  },
  { timestamps: true }
);

const TableModel = mongoose.model("Table", TableSchema);
module.exports = TableModel;
