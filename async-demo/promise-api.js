const p1 = new Promise((resolve) => {
  setTimeout(() => {
    console.log("promise 1");
    resolve(1);
  }, 2000);
});

const p2 = new Promise((resolve) => {
  setTimeout(() => {
    console.log("promise 2");
    resolve(2);
  }, 4000);
});

Promise.all([p1, p2]).then((v) => console.log(v));
