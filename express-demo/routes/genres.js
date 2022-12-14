const express = require("express");

const { Genre, validate } = require("../models/genres");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const genres = await Genre.find().sort("name");
    return res.send(genres);
  } catch (err) {
    return res.send(err.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const genre = await Genre.findById(req.params.id);
    return res.send(genre);
  } catch (err) {
    return res.send(err.message);
  }
});

router.post("/", async (req, res) => {
  const { value, error } = validate({ name: req.body.name });
  const { name } = value;
  const genre = new Genre({ name });

  if (error) return res.send(error.message);

  try {
    const result = await genre.save();
    return res.send(result);
  } catch (error) {
    return res.send(error.message);
  }
});

router.patch("/:id", async (req, res) => {
  const { value, error } = validate({ name: req.body.name });
  const { name } = value;

  if (error) return res.send(error.message);

  try {
    const result = await Genre.findByIdAndUpdate(
      req.params.id,
      { name },
      { new: true }
    );
    res.send(result);
  } catch (err) {
    return res.send(err.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const genre = await Genre.findByIdAndDelete(req.params.id, { new: true });
    res.send(genre);
  } catch (err) {
    res.send(err.message);
  }
});

module.exports = router;
