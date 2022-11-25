const EventEmitter = require("node:events");

class Logger extends EventEmitter {
  log(message) {
    console.log(message);
    this.emit("name", { id: 1, name: "Marcus" });
  }
}

module.exports = Logger;
