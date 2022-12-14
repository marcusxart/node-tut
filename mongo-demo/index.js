const mongoose = require("mongoose");

const { Schema } = mongoose;
const aa = (v) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const result = v && v.length > 0;
      resolve(result);
    }, 2000);
  });
};
mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.log("Connection failed", err));

const Course = mongoose.model(
  "Course",
  new Schema({
    name: { type: String, required: true },
    category: { type: String, required: true, enum: ["web", "kill"] },
    author: String,
    tags: {
      type: [String],
      validate: {
        validator: async function (v) {
          return await aa(v);
        },
        message: "A course should have at least one tag",
      },
    },
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
    price: {
      type: Number,
      required: function () {
        return this.isPublished;
      },
    },
  })
);

const createCourse = async () => {
  try {
    const course = new Course({
      name: "React js Course",
      category: "-",
      author: "Mosh",
      tags: null,
      isPublished: false,
      price: 10,
    });

    const result = await course.save();
    console.log(result);
  } catch (err) {
    for (i in err.errors) {
      console.log(err.errors[i].message);
    }
  }
};
createCourse();

const getCourses = async () => {
  const courses = await Course.find()
    .limit(10)
    .sort({ name: 1 })
    .select({ tags: 1, name: 1 });
  console.log(courses);
};

const updateCourse = async (id, updateObj) => {
  try {
    const result = await Course.findByIdAndUpdate(
      id,
      { $set: updateObj },
      { new: true }
    );
    console.log(result);
  } catch (error) {
    console.log(error.message);
  }
};

// updateCourse("638318cf2a95d2a6774119bb", {
//   isPublished: false,
//   author: "Tom",
// });

const deleteCourse = async (id) => {
  try {
    const result = await Course.findByIdAndRemove(id, { new: true });
    if (!result) throw new Error("Course not found");
  } catch (error) {
    console.log(error.message);
  }
};

// deleteCourse("638318cf2a95d2a6774119bb");
