const express = require("express");
const debug = require("debug")("app:startup");
const Joi = require("joi");
const helmet = require("helmet");
const morgan = require("morgan");

const home = require("./routes/home");
const courses = require("./routes/courses");

const app = express();
const port = process.env.PORT || 8000;

app.set("view engine", "pug");
app.set("views", "./views");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(helmet());
if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  debug("Morgan enabled....");
}
app.use("/", home);
app.use("/api/courses", courses);

app.listen(port, () => console.log(`Listening on port ${port}....`));
