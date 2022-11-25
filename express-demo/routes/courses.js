const Joi = require("joi");
const express = require("express");

const router = express.Router();

const courses = [
  { id: 1, name: "Course1" },
  { id: 2, name: "Course2" },
  { id: 3, name: "Course3" },
];

router.get("/", (req, res) => res.send(courses));

router.get("/:id", (req, res) => {
  const course = courses.find((i) => i.id === parseInt(req.params.id));
  if (!course) return res.status(404).send("Sorry item not found");
  res.send(course);
});

router.post("/", (req, res) => {
  const { error, value } = validateCourse({ name: req.body.name });
  const { name } = value;

  if (error) return res.status(400).send(error.message);

  const course = {
    id: courses.length + 1,
    name,
  };
  courses.push(course);
  return res.send(course);
});

router.patch("/:id", async (req, res) => {
  const course = courses.find((i) => i.id === parseInt(req.params.id));
  const { value, error } = await validateCourse({ name: req.body.name });
  const { name } = value;

  if (!course) return res.status(404).send("Sorry item not found");
  if (error) return res.status(400).send(error.message);

  course.name = name;
  return res.send(course);
});

router.delete("/:id", (req, res) => {
  const course = courses.find((i) => i.id === parseInt(req.params.id));

  if (!course) return res.status(404).send("Sorry item not found");

  const index = courses.indexOf(course);
  courses.splice(index, 1);

  res.send(course);
});

function validateCourse(course) {
  const scheme = Joi.object({
    name: Joi.string().min(3).max(59).required(),
  });

  return scheme.validate(course);
}

module.exports = router;
