const mongoose = require("mongoose");

const { Schema } = mongoose;

mongoose
  .connect("mongodb://localhost:27017/mongo-exercises")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.log("Connection failed...", err.message));

const Course = mongoose.model(
  "course",
  new Schema({
    name: String,
    author: String,
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
    price: Number,
    tags: [String],
  })
);

const getCourses = async () => {
  try {
    const courses = await Course.find()
      .or([{ price: { $gte: 15 } }, { name: /.*by.*/ }])
      .sort("-price");
    console.log(courses);
  } catch (error) {
    console.log(error.message);
  }
};

const updateCourse = async (id, updateObj) => {
  const course = await Course.findById(id);

  console.log(course);
  if (!course) return;

  course.set(updateObj);
  course.save();
  console.log("update successful");
};

updateCourse("5a68fdc3615eda645bc6bdec", {
  isPublished: false,
  author: "Marcus",
});
