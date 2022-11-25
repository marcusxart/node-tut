const EventEmitter = require("events");
const emitter = new EventEmitter();

emitter.on("greeting", () => console.log("Hello World"));
emitter.on("greeting", (arg) => console.log(`My name is ${arg.name}`));
emitter.on("greeting", (arg) => console.log(`I am from ${arg.city}`));

emitter.emit("greeting", { name: "Marcus", city: "Owerri" });
