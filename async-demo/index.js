const getUser = (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`getting user ${id}`);
      resolve({ id, userName: "Marcus" });
    }, 2000);
  });
};

const getRepos = (username) => {
  if (username) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log(`getting ${username} repo`);
        resolve(["repo1", "repo2", "repo3"]);
      }, 2000);
    });
  }
};

const getCommit = (repo) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Commit... " + repo);
      resolve(repo);
    }, 2000);
  });
};

console.log("Before");
const runData = async () => {
  try {
    const user = await getUser(1);
    const repos = await getRepos(user.userName);
    const commit = await getCommit(repos[0]);
    console.log(commit);
  } catch (err) {
    console.log(err.message);
  }
};

runData();

console.log("After");
