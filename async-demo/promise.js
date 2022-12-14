const user = (id) => {
  return new Promise((resolve, reject) => {
    if (id) {
      setTimeout(() => resolve({ id, username: "Marcus" }), 2000);
    } else reject(new Error("id requires*"));
  });
};

user(2)
  .then((data) => console.log(data))
  .catch((err) => console.log(err.message));
