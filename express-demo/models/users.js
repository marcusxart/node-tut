const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const Joi = require("joi");

const { model, Schema } = mongoose;
require("dotenv").config();

const userScheme = new Schema({
  name: { type: String, require: true, minlength: 5, maxlength: 50 },
  email: {
    type: String,
    require: true,
    unique: true,
    minlength: 5,
    maxlength: 255,
  },
  password: { type: String, require: true, minlength: 5, maxlength: 1024 },
});

userScheme.methods.generateAuthToken = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_PRIVATE_KEY);
};
const User = model("user", userScheme);

const validateUser = (user) => {
  const schema = Joi.object({
    name: Joi.string().required().min(5).max(50),
    email: Joi.string().required().min(5).max(255).email(),
    password: Joi.string().required().min(5).max(255),
  });

  return schema.validate(user);
};

module.exports.User = User;
module.exports.validate = validateUser;
