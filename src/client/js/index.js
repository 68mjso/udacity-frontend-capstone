const serverURL = "http://localhost:8000";

const inputSearchForm = document.getElementById("traveInputForm");
const inputSearch = document.getElementById("inputSearch");
const saveBtn = document.getElementById("saveTrip");
const removeBtn = document.getElementById("removeTrip");

inputSearchForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const inputText = inputSearch.value;
  if (inputText.trim() === "" || !inputText) {
    return;
  }
  const searchRes = await searchCity(inputText);
  console.log(searchRes);
});

function handleSubmit(event) {
  event.preventDefault();

  // Get the URL from the input field
  const formText = document.getElementById("name").value;

  // This is an example code that checks the submitted name. You may remove it from your code
  // checkForName(formText);

  // Check if the URL is valid
  if (formText.trim() === "") {
    alert("Missing Input");
    return;
  }

  // If the URL is valid, send it to the server using the serverURL constant above
  const data = new URLSearchParams();

  data.append("input", formText);
  submit(data);
}

// Function to send data to the server

function submit(data) {
  fetch(`${serverURL}/submit`, {
    method: "POST",
    body: data,
  })
    .then((res) => res.json())
    .then(function (res) {
      document.getElementById("results").innerHTML = res.message;
    })
    .catch((e) => alert(e));
}

function searchCity(input) {
  return new Promise((resolve, reject) => {
    fetch(`${serverURL}/search-city?input=${input}`)
      .then((res) => res.json())
      .then(function (res) {
        resolve(res);
      })
      .catch((e) => {
        reject(e);
      });
  });
}

// Export the handleSubmit function
export { handleSubmit };
