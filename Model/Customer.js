const mongoose = require("mongoose");

const CustomerSchema = new mongoose.Schema(
  {
    name: { 
        type: String, 
        required: true 
    },
    mobileNumber: { 
        type: String, 
        unique: true, 
        required: true 
    },
    email: { 
        type: String, 
        unique: true, 
        required: true 
    },
    password: { 
        type: String, 
        required: true 
    },
  },
  { timestamps: true }
);

const CustomerModel = mongoose.model("Customer", CustomerSchema);
module.exports = CustomerModel;
