const express = require("express");
const Joi = require("joi");
const bcrypt = require("bcrypt");

const { User } = require("../models/users");

const validate = (req) => {
  const schema = Joi.object({
    email: Joi.string().required().min(5).max(255).email(),
    password: Joi.string().required().min(5).max(255),
  });

  return schema.validate(req);
};

const router = express.Router();

router.post("/", async (req, res) => {
  const { value, error } = validate(req.body);
  if (error) return res.status(400).send(error.message);

  let user = await User.findOne({ email: value.email });
  if (!user) return res.status(400).send("Invalid email or password");

  const match = await bcrypt.compare(value.password, user.password);
  if (!match) return res.status(400).send("Invalid email or password");

  const token = user.generateAuthToken();
  res.send(token);
});

module.exports = router;
