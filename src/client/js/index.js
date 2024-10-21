const serverURL = "http://localhost:8000";

const inputSearchForm = document.getElementById("traveInputForm");
const inputSearch = document.getElementById("inputSearch");
const inputDate = document.getElementById("inputDate");
const travelMain = document.getElementById("travelMain");
// const saveBtn = document.getElementById("saveTrip");
// const removeBtn = document.getElementById("removeTrip");

if (inputSearchForm) {
  inputSearchForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const inputText = inputSearch.value;
    const rawDate = inputDate.value;
    const plannedDate = new Date(rawDate + "T00:00").getTime();
    if (inputText.trim() === "" || !inputText) {
      alert("Missing Input");
      return;
    }
    if (!plannedDate) {
      alert("Missing Date");
      return;
    }
    const diff = plannedDate - Date.now();
    // Check user choose invalid future date
    if (diff <= 0) {
      alert("Please choose a future date.");
      return;
    }
    // Convert millisecond to day
    const diffDay = Math.ceil(diff / 24 / 60 / 60 / 1000);
    const searchRes = await searchCityMock(inputText);
    // const searchRes = await searchCity(inputText);
    const { data } = searchRes;
    // Get the future weather (max 7 days)
    const weather = data.weather.data[diff > 7 ? 6 : diff - 1];
    travelMain.style.padding = "1rem";
    // append location to HTML
    travelMain.innerHTML = `
          <img
            src=${data["pixa"]["webformatURL"]}
          />
          <div class="travel-details">
            <h2>My trip to: ${data.name}, ${data.countryName}</h2>
            <h2>Departing: ${rawDate}</h2>
            <div class="buttons">
              <button id="saveTrip">Save Trip</button>
              <button id="removeTrip">Remove Trip</button>
            </div>
            <p>${data.name}, ${data.countryName} is ${diffDay} days away</p>
            <div class="weather-info">
              <p>Typical weather for then is:</p>
              <p id="temperature" class="temperature">High: ${weather.high_temp}, Low: ${weather.low_temp}</p>
              <p id="description" class="description">
                Weather: ${weather.weather.description}
              </p>
            </div>
          </div>
    `;
  });
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

function searchCityMock(input) {
  return new Promise((resolve, reject) => {
    fetch(`https://run.mocky.io/v3/eb7f6c67-cf08-473b-879f-87fa44983cd1`)
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
export { searchCity };
