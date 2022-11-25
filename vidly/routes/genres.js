const express = require("express");
const Joi = require("joi");
const router = express.Router();
const mongoose = require("mongoose");

const Genre = mongoose.model(
  "Genre",
  new mongoose.Schema({
    name: { type: String, required: true, minLength: 5, maxLength: 50 },
  })
);

router.get("/", async (req, res) => {
  const genres = await Genre.find().sort("name");
  res.send(genres);
});

router.post("/", async (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let genre = new Genre({
    name: req.body.name,
  });
  try {
    const result = await genre.save();
    res.send(result);
  } catch (error) {
    res.send(error.message);
  }
});

router.put("/:id", async (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findById(req.params.id);
  if (!genre)
    return res.status(404).send("The genre with the given ID was not found.");
  genre.set({
    name: req.body.name,
  });
  const result = await genre.save();
  res.send(result);
});

router.delete("/:id", async (req, res) => {
  const result = await Genre.deleteOne({ _id: req.params.id });
  if (!result)
    return res.status(404).send("The genre with the given ID was not found.");
  res.send(result);
});

router.get("/:id", async (req, res) => {
  const genre = await Genre.findById(req.params.id);
  if (!genre)
    return res.status(404).send("The genre with the given ID was not found.");

  res.send(genre);
});

function validateGenre(genre) {
  const schema = {
    name: Joi.string().alphanum().min(3).required(),
  };

  return Joi.validate(genre, schema);
}

module.exports = router;
