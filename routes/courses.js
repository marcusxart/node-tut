const express = require("express");
const router = express.Router();

const arr = [
  { id: 1, name: "yes1" },
  { id: 2, name: "yes2" },
  { id: 3, name: "yes3" },
];

router.get("/", (req, res) => {
  res.send(arr);
});

router.get("/:id", (req, res) => {
  const list = arr.find((a) => a.id === parseInt(req.params.id));
  if (!list) res.status(404).send("Item not found");
  res.send(list);
});

router.post("/", async (req, res) => {
  const schema = Joi.object({
    name: Joi.string().alphanum().min(3).required(),
  });

  try {
    const result = await schema.validateAsync({ name: req.body.name });
    const list = {
      id: arr.length + 1,
      name: result.name,
    };
    arr.push(list);
    res.send(arr);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
