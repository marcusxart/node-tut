const express = require("express");
const mongoose = require("mongoose");

const home = require("./routes/home");
const courses = require("./routes/courses");
const genre = require("./routes/genres");
const customers = require("./routes/customers");
const movies = require("./routes/movies");
const rental = require("./routes/rental");
const users = require("./routes/users");
const auth = require("./routes/auth");

const app = express();
const port = process.env.PORT || 8000;

mongoose
  .connect("mongodb://localhost/vidly")
  .then(() => console.log("Connected MongoDB..."))
  .catch((err) => console.log("Connecting failed", err.message));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", home);
app.use("/api/courses", courses);
app.use("/api/genres", genre);
app.use("/api/customers", customers);
app.use("/api/movies", movies);
app.use("/api/rental", rental);
app.use("/api/users", users);
app.use("/api/auth", auth);

app.listen(port, () => console.log(`Listening on port ${port}....`));
