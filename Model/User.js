const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: { 
        type: String, 
        required: true 
    },
    restaurantId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Restaurant', 
        required: true 
    },
    role: { 
        type: String, 
        enum: ['owner', 'staff', 'chef'], 
        required: true 
    },
    email: { 
        type: String, 
        unique: true, 
        required: true 
    },
    password: { 
        type: String, 
        required: true },
  },
  { timestamps: true }
);

const UserModel = mongoose.model("User", UserSchema);
module.exports = UserModel;
