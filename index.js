const express = require("express");
const DbConnection = require("./Services/Db/Connection");
const bodyParser = require("body-parser");
const cors = require("cors");
const AppErr = require("./Services/AppErr");
// const cloudinary = require("cloudinary");
const RestaurantRouter = require("./Routes/Restaurant");
const AuthRouter = require("./Routes/Auth");
const UserRouter = require("./Routes/User");
const CategoryRouter = require("./Routes/Category");
const MenuRouter = require("./Routes/Menu");
const OrderRouter = require("./Routes/Order");
const TableRouter = require("./Routes/Table");

const app = express();

//------IN Build Middleware----------//
// app.use(morgan("combined"));
// app.use(helmet());
app.use(cors());
// app.use(mongosantize());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//--------------- Route Middleware ------------------//

app.use("/api/v1/auth", AuthRouter);
app.use("/api/v1/user", UserRouter);
app.use("/api/v1/restaurant", RestaurantRouter);
app.use("/api/v1/category", CategoryRouter);
app.use("/api/v1/menu", MenuRouter);
app.use("/api/v1/table", TableRouter);
app.use("/api/v1/order", OrderRouter);

//--------------Not Found Route-------------------//
// app.get("*", (req, res, next) => {
//   return next(new AppErr("Route not found", 404));
// });

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  DbConnection();
  console.log(`listening on ${PORT}`);
});
