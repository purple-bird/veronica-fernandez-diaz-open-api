const params = new URLSearchParams(window.location.search);
console.log("params:", params);
const personURL = params.get("url");
console.log("personURL: ", personURL);
personHeader = document.getElementById("person");
personDetails = document.getElementById("details");
backButton = document.getElementById("back-button");

// To be able to click button and see a list of all characters
backButton.addEventListener("click", () => {
  window.location.href = "index.html";
});

// To fetch the data from the corresponding character
fetch(personURL)
  .then((res) => {
    if (!res.ok) {
      throw new Error("There was error");
    }
    return res.json();
  })

  .then((data) => {
    const superhero = data.data.results[0];

    // Look at superhero thumbnail
    const superheroThumbnail = superhero.thumbnail;
    console.log(superheroThumbnail);

    // Create valid URL for image
    const superheroImageURL =
      `${superheroThumbnail.path}` + `.` + `${superheroThumbnail.extension}`;
    console.log(superheroImageURL);

    // Create image element
    const superheroImage = document.createElement("img");
    superheroImage.src = superheroImageURL;

    // Get title
    const title = superhero.name;

    // Create header 2
    const titleElement = document.createElement("h2");

    // Put title text in header
    titleElement.innerText = title;

    // Get description
    const description = superhero.description;

    // Create header 3
    const descriptionElement = document.createElement("h3");

    // Put description text in header
    descriptionElement.innerText = description;

    // Order inside container
    personDetails.appendChild(titleElement);
    personDetails.appendChild(descriptionElement);
    personDetails.appendChild(superheroImage);
  })

  .catch((err) => {
    console.log(err);
  });
