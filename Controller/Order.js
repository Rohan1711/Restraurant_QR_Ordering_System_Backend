const { validationResult } = require("express-validator");
const AppErr = require("../Services/AppErr");
const MenuModel = require("../Model/Menu");
const mongoose = require("mongoose");
const RestaurantModel = require("../Model/Restaurant");
const TableModel = require("../Model/Table");
const OrderModel = require("../Model/Order");

const placeOrder = async (req, res, next) => {
  try {
    const { tableId, restaurantId, items } = req.body;

    //-------Validation Check--------------//
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return next(new AppErr(result.errors[0].msg, 403));
    }

    // Check if `itemId`, `tableId`, and `restaurantId` are valid ObjectIds
    if (
      !mongoose.Types.ObjectId.isValid(tableId) ||
      !mongoose.Types.ObjectId.isValid(restaurantId)
    ) {
      return next(new AppErr("Invalid IDs provided", 400));
    }

    //--------Check restaurant -------------//
    const restaurantFound = await RestaurantModel.findById(restaurantId);
    if (!restaurantFound) {
      return next(new AppErr("Restaurant not found", 404));
    }

    //--------Check table -------------//
    const tableFound = await TableModel.findById(tableId);
    if (!tableFound) {
      return next(new AppErr("Table not found", 404));
    }

    // Validate and check each item
    let totalPrice = 0;
    const cart = [];

    for (const item of items) {
      if (!mongoose.Types.ObjectId.isValid(item.itemId)) {
        return next(new AppErr("Invalid itemId provided", 400));
      }

      const itemFound = await MenuModel.findById(item.itemId);
      if (!itemFound) {
        return next(
          new AppErr(`Menu item not found for itemId ${item.itemId}`, 404)
        );
      }

      // Calculate total price for this item
      const itemTotalPrice = item.quantity * itemFound.price;
      totalPrice += itemTotalPrice;

      // Add validated item to the list
      cart.push({
        itemId: item.itemId,
        quantity: item.quantity,
        notes: item.notes || "",
      });
    }

    // Create and save the order
    const order = new OrderModel({
      tableId,
      restaurantId,
      items: cart,
      payment: totalPrice,
    });

    await order.save();

    return res.status(200).json({
      status: true,
      statuscode: 200,
      message: "Order placed successfully",
      data: order,
    });
  } catch (error) {
    return next(new AppErr(error.message, 500));
  }
};

module.exports = {
  placeOrder,
};
