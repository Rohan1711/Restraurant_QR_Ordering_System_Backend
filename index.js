const express = require("express");
const DbConnection = require("./Services/Db/Connection");

const app = express();

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  DbConnection();
  console.log(`listening on ${PORT}`);
});