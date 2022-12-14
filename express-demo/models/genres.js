const Joi = require("joi");
const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const genreSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
    lowercase: true,
  },
});

const Genre = model("genre", genreSchema);

const validateGenre = (genre) => {
  const scheme = Joi.object({
    name: Joi.string().min(3).max(50).required(),
  });

  return scheme.validate(genre);
};

exports.Genre = Genre;
exports.genreSchema = genreSchema;
exports.validate = validateGenre;
