const express = require("express");
const Joi = require("joi");

const router = express.Router();

const genres = [
  { id: 1, name: "Horror" },
  { id: 2, name: "Action" },
  { id: 3, name: "Sports" },
];

const validateGenre = (genre) => {
  const scheme = Joi.object({
    name: Joi.string().min(3).max(50).required(),
  });

  return scheme.validate(genre);
};

router.get("/", (req, res) => res.send(genres));

router.get("/:id", (req, res) => {
  const genre = genres.find((i) => i.id === parseInt(req.params.id));

  if (!genre) return res.status(404).send("genre not found");

  return res.send(genre);
});

router.post("/", (req, res) => {
  const { value, error } = validateGenre({ name: req.body.name });
  const { name } = value;

  if (error) return res.status(400).send(error.message);

  const genre = {
    id: genres.length + 1,
    name,
  };
  genres.push(genre);
  return res.send(genre);
});

router.patch("/:id", (req, res) => {
  const genre = genres.find((i) => i.id === parseInt(req.params.id));
  const { value, error } = validateGenre({ name: req.body.name });
  const { name } = value;

  if (!genre) return res.status(404).send("genre not found");
  if (error) return res.status(400).send(error.message);

  genre.name = name;
  return res.send(genre);
});

router.delete("/:id", (req, res) => {
  const genre = genres.find((i) => i.id === parseInt(req.params.id));

  if (!genre) return res.status(404).send("genre not found");

  const index = genres.indexOf(genre);
  genres.splice(index, 1);

  return res.send(genre);
});

module.exports = router;
