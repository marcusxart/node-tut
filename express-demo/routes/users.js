const express = require("express");
const _ = require("lodash");
const bcrypt = require("bcrypt");

const { validate, User } = require("../models/users");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const users = await User.find().sort("name");
    res.send(users);
  } catch (error) {
    res.send(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const users = await User.findById(req.params.id);
    res.send(users);
  } catch (error) {
    res.send(error.message);
  }
});

router.post("/", async (req, res) => {
  const { value, error } = validate(req.body);
  if (error) return res.status(400).send(error.message);
  let user = await User.findOne({ email: value.email });
  if (user) return res.status(404).send("User already existed ");

  user = new User(_.pick(value, ["name", "email", "password "]));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(value.password, salt);

  try {
    await user.save();
    const token = user.generateAuthToken();
    res
      .header("x-auth-token", token)
      .send(_.pick(user, ["_id", "name", "email"]));
  } catch (error) {
    res.send(error.message);
  }
});

module.exports = router;
