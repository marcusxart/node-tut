const express = require("express");

const genres = require("./routes/genres");

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/genres", genres);

app.listen(port, () => console.log(`Listening on port ${port}....`));
