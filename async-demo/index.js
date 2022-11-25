console.log("11");
// getUser(2, (user) => {
//   getRepo(user.userName, (repo) => {
//     getCommit(repo[0], (commit) => {
//       console.log(commit);
//     });
//   });
// });

getUser(2)
  .then((user) => getRepo(user.userName))
  .then((repo) => getCommit(repo[0]))
  .then((commit) => console.log(commit));

console.log("22");

function getUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("get user...");
      resolve({ id, userName: "Ed" });
    }, 2000);
  });
}

function getRepo(username) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(username);
      resolve(["repo1", "repo2", "repo3"]);
    }, 2000);
  });
}

function getCommit(repo) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("calling github....");
      resolve("commit..");
    }, 2000);
  });
}
