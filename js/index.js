// Create fetch for my Github:
fetch("https://api.github.com/users/purple-bird/repos")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Request failed");
    }
    return response.json();
  })

  // Handle JSON data:
  .then((repositories) => {
    console.log("These are the repositories:", repositories);
  })

  // Handle errors:
  .catch((error) => {
    console.error("An error occured:", error);
  });
