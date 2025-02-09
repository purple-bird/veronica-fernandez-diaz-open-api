const superheroContainer = document.getElementById("superhero-container");

const fetchSuperhero = document.getElementById("fetch-superhero");

// The fetch happens after clicking the button
fetchSuperhero.addEventListener("click", () => {
  // Make sure it is empty before generating again
  superheroContainer.innerHTML = "";

  // Get random number
  function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  let randomObject = getRandomNumber(1, 20);
  console.log(randomObject);

  // Create fetch for my Github:
  fetch(
    "http://gateway.marvel.com/v1/public/comics?ts=1&apikey=9509d166898bd3ba72a66cb5ad658b98&hash=148d632631f5d12900e7bf7e61af9275"
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Request failed");
      }
      return response.json();
    })

    // Handle JSON data:
    .then((repositories) => {
      // Look at superhero object
      const superhero = repositories.data.results[randomObject];

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
      const title = superhero.title;

      // Create header 2
      const titleElement = document.createElement("h2");

      // Put title text in header
      titleElement.innerText = title;

      // Get format
      const format = superhero.format;

      // Create header 3
      const formatElement = document.createElement("h3");

      // Put format text in header
      formatElement.innerText = format;

      // Order inside container
      superheroContainer.appendChild(titleElement);
      superheroContainer.appendChild(formatElement);
      superheroContainer.appendChild(superheroImage);
    })

    // Handle errors:
    .catch((error) => {
      console.error("An error occured:", error);
    });
});
