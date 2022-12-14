const express = require("express");

const { Genre, validate, Movie } = require("../models/movies");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const result = await Movie.find().sort("title");
    return res.send(result);
  } catch (err) {
    return res.status(400).send(err.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const result = await Movie.findById(req.params.id);
    return res.send(result);
  } catch (err) {
    return res.status(400).send(err.message);
  }
});

router.post("/", async (req, res) => {
  const { value, err } = validate(req.body);
  const movie = new Movie({
    ...value,
    genre: new Genre({ name: value.genre }),
  });

  if (err) return res.status(400).send(err.message);

  try {
    const result = await movie.save();
    return res.send(result);
  } catch (err) {
    return res.status(400).send(err.message);
  }
});

router.patch("/:id", async (req, res) => {
  const { value, err } = validate(req.body);
  if (err) return res.status(400).send(err.message);

  try {
    const result = await Movie.findByIdAndUpdate(
      req.params.id,
      {
        ...value,
        genre: new Genre({ name: value.genre }),
      },
      { new: true }
    );
    return res.send(result);
  } catch (err) {
    return res.status(400).send(err.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const result = await Movie.findByIdAndDelete(req.params.id, { new: true });
    return res.send(result);
  } catch (err) {
    return res.status(400).send(err.message);
  }
});

module.exports = router;
