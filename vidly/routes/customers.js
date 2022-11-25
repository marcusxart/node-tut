const mongoose = require("mongoose");
const express = require("express");
const Joi = require("joi");
const router = express.Router();

const Customer = mongoose.model(
  "Customer",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50,
    },
    isGold: { type: Boolean, default: false },
    phone: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50,
    },
  })
);

router.get("/", async (req, res) => {
  const genres = await Customer.find().sort("name");
  res.send(genres);
});

router.post("/", async (req, res) => {
  const { error } = validateCustomer(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let genre = new Customer({
    name: req.body.name,
    phone: req.body.phone,
    isGold: req.body.isGold,
  });
  try {
    const result = await genre.save();
    res.send(result);
  } catch (error) {
    res.send(error.message);
  }
});

function validateCustomer(customer) {
  const schema = {
    name: Joi.string().min(3).max(50).required(),
    phone: Joi.string().min(3).max(50).required(),
    isGold: Joi.boolean(),
  };

  return Joi.validate(customer, schema);
}

module.exports = router;
