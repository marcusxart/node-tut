const express = require("express");

const { validate, Customer } = require("../models/customers");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const result = await Customer.find().sort("name");
    res.send(result);
  } catch (err) {
    res.send(err.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const result = await Customer.findById(req.params.id);
    if (!result) throw new Error("No customer found");
    return res.send(result);
  } catch (err) {
    return res.send(err.message);
  }
});

router.post("/", async (req, res) => {
  const { value, error } = validate;
  const customer = new Customer(value);
  if (error) res.send(error.message);

  try {
    const result = await customer.save();
    res.send(result);
  } catch (err) {
    res.send(err.message);
  }
});

router.patch("/:id", async (req, res) => {
  const { value, error } = validate;

  if (error) res.send(error.message);

  try {
    const result = await Customer.findByIdAndUpdate(req.params.id, value, {
      new: true,
    });

    res.send(result);
  } catch (err) {
    res.send(err.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const result = await Customer.findByIdAndDelete(req.params.id, {
      new: true,
    });
    res.send(result);
  } catch (err) {
    res.send(err.message);
  }
});
module.exports = router;
