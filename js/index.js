const baseUrl =
  "http://gateway.marvel.com/v1/public/characters?ts=1&apikey=9509d166898bd3ba72a66cb5ad658b98&hash=148d632631f5d12900e7bf7e61af9275&limit=30";
const heroContainer = document.getElementById("all-heroes");
const nextButton = document.getElementById("next-button");
const previousButton = document.getElementById("previous-button");

// Create variables for pagination - show 30 at a time
let page = 0;
let perPage = 30;

// Function to fetch all data

async function fetchAllRecords() {
  try {
    const response = await fetch(baseUrl);

    if (!response.ok) {
      throw new Error("Request Failed");
    }

    let record = await response.json();
    console.log("Record:", record);

    const recordLength = record.data.total;

    console.log("Data feched successfully:", recordLength);

    // For Pagination
    heroContainer.innerHTML = "";
    let min = page * perPage;
    let max = min + perPage;

    // Create URLs pull data from

    const pageUrl = baseUrl + "&offset=";
    const urls = [];

    for (let i = min; i < Math.min(recordLength, max); i += 30) {
      urls.push(pageUrl + i);

      if (i > perPage) {
        break;
      }
    }

    getAllPages(urls);
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

fetchAllRecords();

// Function to fetch the URLs of each character

async function getAllPages(urls) {
  const promiseList = urls.map((url) =>
    fetch(url).then((r) =>
      r.json().catch((err) => console.log("There was an errror", err))
    )
  );

  const finalResult = await Promise.all(promiseList).then((allResults) => {
    let finalList = [];
    allResults.forEach((res) => {
      finalList = finalList.concat(res.data.results);
    });
    console.log("finalList: ", finalList);

    // For each character get the name

    for (let person of finalList) {
      // To create a div element
      let personElt = document.createElement("div");

      // To use the ID number of a character
      let aPerson = person.id;

      // To create the URL for each character

      let personURL =
        `https://gateway.marvel.com/v1/public/characters/` +
        `${aPerson}` +
        `?ts=1&apikey=9509d166898bd3ba72a66cb5ad658b98&hash=148d632631f5d12900e7bf7e61af9275`;

      // Set class attribute
      personElt.className = "person";

      // Create li element
      personHeader = document.createElement("li");

      // Set the inner text to show the character's name

      personHeader.innerText = person.name;

      // Place the created elements
      personElt.appendChild(personHeader);
      heroContainer.appendChild(personElt);

      // Create event listener so clicking on a character goes to that character's corresponding info page

      personElt.addEventListener("click", () => {
        const personUrlFile = "./person.html";
        const params = new URLSearchParams();
        params.append("url", personURL);
        const paramsURL = personUrlFile + "?" + params.toString();
        console.log("paramsURL: ".paramsURL);
        window.location.href = paramsURL;
      });
    }
    return finalList;
  });
}

// To be able to click the next button and see the next 30 characters
nextButton.addEventListener("click", function () {
  page++;
  fetchAllRecords();
});

// To be able to click the previous button and see the previous 30 characters

previousButton.addEventListener("click", function () {
  page--;
  fetchAllRecords();
});
