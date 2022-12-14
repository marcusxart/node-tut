const mongoose = require("mongoose");
const Joi = require("joi");

const { Schema, model } = mongoose;

const Customer = model(
  "customer",
  new Schema({
    name: {
      type: String,
      trim: true,
      required: true,
      minlength: 3,
      maxlength: 200,
    },
    isGold: { type: Boolean, required: true },
    phone: {
      type: String,
      trim: true,
      required: true,
      minlength: 3,
      maxlength: 30,
    },
  })
);

const validateCustomer = (dataObj) => {
  const scheme = Joi.object({
    name: Joi.string().required().min(3).max(200).trim(),
    isGold: Joi.boolean().required(),
    phone: Joi.string().required().min(3).max(30).trim(),
  });

  return scheme.validate(dataObj);
};

exports.Customer = Customer;
exports.validate = validateCustomer;
