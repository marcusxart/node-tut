const mongoose = require("mongoose");
const Joi = require("joi");

const { model, Schema } = mongoose;

const RentalScheme = model(
  "rental",
  new Schema({
    customer: {
      type: new Schema({
        name: {
          type: String,
          trim: true,
          required: true,
          minlength: 3,
          maxlength: 200,
        },
        phone: {
          type: String,
          trim: true,
          required: true,
          minlength: 3,
          maxlength: 30,
        },
      }),
      required: true,
    },

    movie: {
      type: new Schema({
        title: { type: String, required: true, trim: true },
        dailyRentalRate: { type: Number, required: true, smax: 999 },
      }),
      required: true,
    },
    dateOut: {
      type: Date,
      required: true,
      default: Date.now,
    },
    dateReturned: {
      type: Date,
    },
    rentalFee: {
      type: Number,
      min: 0,
    },
  })
);

const validateRental = (rental) => {
  const scheme = Joi.object({
    customerId: Joi.string().required(),
    movieId: Joi.string().required(),
  });

  return scheme.validate(rental);
};

module.exports.Rental = RentalScheme;
module.exports.validate = validateRental;
