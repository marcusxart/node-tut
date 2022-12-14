const express = require("express");

const { Rental, validate } = require("../models/rental");
const { Customer } = require("../models/customers");
const { Movie } = require("../models/movies");

const router = express.Router();

router.get("/", async (req, res) => {
  const rentals = await Rental.find().sort("-dateOut");
  res.send(rentals);
});

router.get("/:id", async (req, res) => {
  const rental = await Rental.findById(req.params.id);

  if (!rental)
    return res.status(404).send("The rental with the given ID was not found.");

  res.send(rental);
});

router.post("/", async (req, res) => {
  const { value, error } = validate(req.body);
  if (error) res.status(400).send(error.message);
  const customer = await Customer.findById(value.customerId);
  if (!customer) res.status(400).send("Invalid customer Id");

  const movie = await Movie.findById(value.movieId);
  if (!movie) res.status(400).send("Invalid movie Id");
  const rental = new Rental({
    customer: {
      _id: customer._id,
      name: customer.name,
      phone: customer.phone,
    },
    movie: {
      _id: movie._id,
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate,
    },
  });
  try {
    const result = await rental.save();

    movie.numberInStock--;
    await movie.save();

    res.send(result);
  } catch (error) {
    res.send(error.message);
  }
});

module.exports = router;
