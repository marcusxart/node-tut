const mongoose = require("mongoose");
const genres = require("./routes/genres");
const customer = require("./routes/customers");
const express = require("express");
const app = express();

mongoose
  .connect("mongodb://localhost/vidly")
  .then(() => console.log("connected to mongpDB..."))
  .catch((err) => console.log("ERROR:", err));

app.use(express.json());
app.use("/api/genres", genres);
app.use("/api/customer", customer);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
