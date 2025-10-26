// 1
async function block(){
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("Heavy work completed");
            resolve();
        }, 2000);
    });
}

console.log("one");
block();
console.log("two");

// 2
const promise1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Promise 1 resolved successfully!");
  }, 1000);
});

const promise2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(new Error("Promise 2 rejected!"));
  }, 1500);
});

promise1
  .then((result) => {
    console.log("Promise 1 result:", result);
  })
  .catch((error) => {
    console.log("Promise 1 error:", error.message);
  });

promise2
  .then((result) => {
    console.log("Promise 2 result:", result);
  })
  .catch((error) => {
    console.log("Promise 2 error:", error.message);
  });

Promise.allSettled([promise1, promise2]).then((results) => {
  console.log("All promises settled:");
  results.forEach((result, index) => {
    if (result.status === "fulfilled") {
      console.log(`Promise ${index + 1}: SUCCESS -`, result.value);
    } else {
      console.log(`Promise ${index + 1}: FAILED -`, result.reason.message);
    }
  });
});

// 3
const promise3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(new Error("Promise 3 rejected!"));
  }, 500);
});

const promise4 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Promise 4 resolved!");
  }, 800);
});

const promise5 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(new Error("Promise 5 rejected!"));
  }, 300);
});

const promise6 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Promise 6 resolved!");
  }, 1200);
});

Promise.race([promise3, promise4, promise5, promise6])
  .then((result) => {
    console.log("First resolved promise:", result);
  })
  .catch((error) => {
    console.log("All promises rejected or first was rejected:", error.message);
  });

function getFirstResolved(promises) {
  return new Promise((resolve, reject) => {
    let resolvedCount = 0;
    let hasResolved = false;

    promises.forEach((promise, index) => {
      promise
        .then((result) => {
          if (!hasResolved) {
            hasResolved = true;
            resolve({ result, index });
          }
        })
        .catch((error) => {
          resolvedCount++;
          if (resolvedCount === promises.length && !hasResolved) {
            reject(new Error("All promises rejected"));
          }
        });
    });
  });
}

getFirstResolved([promise3, promise4, promise5, promise6])
  .then(({ result, index }) => {
    console.log(`First resolved promise (index ${index}):`, result);
  })
  .catch((error) => {
    console.log("All promises rejected:", error.message);
  });

// 4
const promise7 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Promise 7 - Success!");
  }, 600);
});

const promise8 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(new Error("Promise 8 - Failed!"));
  }, 400);
});

const promise9 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Promise 9 - Success!");
  }, 900);
});

const promise10 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(new Error("Promise 10 - Failed!"));
  }, 700);
});

Promise.allSettled([promise7, promise8, promise9, promise10]).then(
  (results) => {
    console.log("All promises settled:");

    const counts = results.reduce(
      (acc, result, index) => {
        if (result.status === "fulfilled") {
          console.log(`Promise ${index + 7}: SUCCESS -`, result.value);
          acc.successful++;
        } else {
          console.log(`Promise ${index + 7}: FAILED -`, result.reason.message);
          acc.unsuccessful++;
        }
        return acc;
      },
      { successful: 0, unsuccessful: 0 }
    );

    console.log(`Successful promises: ${counts.successful}`);
    console.log(`Unsuccessful promises: ${counts.unsuccessful}`);
    console.log(`Total promises: ${counts.successful + counts.unsuccessful}`);
  }
);

Promise.allSettled([promise7, promise8, promise9, promise10]).then(
  (results) => {
    const successful = results.filter(
      (result) => result.status === "fulfilled"
    );
    const unsuccessful = results.filter(
      (result) => result.status === "rejected"
    );

    console.log(`Successful: ${successful.length}`);
    console.log(`Unsuccessful: ${unsuccessful.length}`);
  }
);


// 5
const promise11 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Promise 11 - Success!");
  }, 500);
});

const promise12 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(new Error("Promise 12 - Failed!"));
  }, 300);
});

const promise13 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(new Error("Promise 13 - Failed!"));
  }, 800);
});

const promise14 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Promise 14 - Success!");
  }, 600);
});

const promise15 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(new Error("Promise 15 - Failed!"));
  }, 400);
});

Promise.allSettled([promise11, promise12, promise13, promise14, promise15])
  .then((results) => {
    console.log("All promises settled:");

    const unsuccessfulPromises = results.filter(
      (result) => result.status === "rejected"
    );

    console.log("\n=== Unsuccessful Promises Only ===");
    unsuccessfulPromises.forEach((result, index) => {
      console.log(`Failed Promise ${index + 1}:`, result.reason.message);
    });


    return unsuccessfulPromises;
  })
  .then((unsuccessfulPromises) => {
    return unsuccessfulPromises;
  });

function filterUnsuccessfulPromises(promises) {
  return Promise.allSettled(promises).then((results) => {
    return results.filter((result) => result.status === "rejected");
  });
}

filterUnsuccessfulPromises([
  promise11,
  promise12,
  promise13,
  promise14,
  promise15,
]).then((unsuccessfulPromises) => {
  console.log("Unsuccessful promises:", unsuccessfulPromises.length);
  unsuccessfulPromises.forEach((promise, index) => {
    console.log(`Failed ${index + 1}:`, promise.reason.message);
  });
});



// 6
const api1 = "https://jsonplaceholder.typicode.com/users";
const api2 = "https://jsonplaceholder.typicode.com/posts";


async function fetchBothAPIs() {
  try {
    
    const [usersResponse, postsResponse] = await Promise.all([
      fetch(api1),
      fetch(api2)
    ]);
    
    const users = await usersResponse.json();
    const posts = await postsResponse.json();
    
    console.log(`Users: ${users.length}, Posts: ${posts.length}`);
    console.log("Sample user:", users[0].name);
    console.log("Sample post:", posts[0].title);
    
  } catch (error) {
    console.log("Error in async/await:", error.message);
  }
}

fetchBothAPIs();