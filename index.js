const http = require("node:http");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.write("Hello World");
    res.end();
  }

  if (req.url === "/api/course") {
    res.write(JSON.stringify([1, 2, 3]));
    res.end();
  }
});
server.listen(8000, () => console.log("Listening port on 8000"));
