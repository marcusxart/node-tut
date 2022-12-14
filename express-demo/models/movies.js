const mongoose = require("mongoose");
const Joi = require("joi");

const { genreSchema } = require("../models/genres");

const { Schema, model } = mongoose;

const Genre = model("genre", genreSchema);

const Movie = model(
  "movie",
  new Schema({
    title: { type: String, required: true, trim: true },
    genre: { type: genreSchema, required: true },
    numberInStock: { type: Number, required: true, max: 999 },
    dailyRentalRate: { type: Number, required: true, smax: 999 },
  })
);

const validateMovie = (genre) => {
  const scheme = Joi.object({
    title: Joi.string().required().trim(),
    genre: Joi.string().required(),
    numberInStock: Joi.number().max(999),
    dailyRentalRate: Joi.number().max(999),
  });

  return scheme.validate(genre);
};

exports.Genre = Genre;
exports.Movie = Movie;
exports.validate = validateMovie;
