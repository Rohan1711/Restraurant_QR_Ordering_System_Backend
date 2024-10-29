const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
    },
    tableId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Table",
      required: true,
    },
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: false,
    },
    items: [
      {
        itemId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Menu",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        notes: {
          type: String,
        },
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "In Progress", "Completed"],
      default: "Pending",
    },
    orderNotes: {
      type: String,
    },
  },
  { timestamps: true }
);

const OrderModel = mongoose.model("Order", OrderSchema);
module.exports = OrderModel;
