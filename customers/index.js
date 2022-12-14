const express = require("express");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/cu");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => res.send("Hello World"));

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Listening on port ${port}`));
