const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String,
});

const Author = mongoose.model("Author", authorSchema);

const Course = mongoose.model(
  "Course",
  new mongoose.Schema({
    name: String,
    authors: [authorSchema],
  })
);

async function createCourse(name, authors) {
  const course = new Course({
    name,
    authors,
  });

  const result = await course.save();
  console.log(result);
}

async function listCourses() {
  const courses = await Course.find();
  console.log(courses);
}

async function addAuthor(id, author) {
  try {
    const course = await Course.findById(id);
    course.authors.push(author);
    const result = await course.save();

    console.log(result);
  } catch (error) {
    console.log(error.message);
  }
}
async function removeAuthor(id, authorId) {
  try {
    const course = await Course.findById(id);
    course.authors.id(authorId).remove();
    const result = await course.save();

    console.log(result);
  } catch (error) {
    console.log(error.message);
  }
}

removeAuthor("63874779a2a93ff56c214a51", "638749888a2ab38f8d0048e6");
// addAuthor("63874779a2a93ff56c214a51", new Author({ name: "Nani" }));
// updateAuthor("63873c49778919c1f5e900ec", "Mosh");
// createCourse("Node Course", [
//   new Author({ name: "Mosh" }),
//   new Author({ name: "James" }),
// ]);
