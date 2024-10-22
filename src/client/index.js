import { searchCity, convertMiliToDay } from "./js";

import "./styles/base.scss";
import "./styles/main.scss";

const inputSearchForm = document.getElementById("traveInputForm");
const inputSearch = document.getElementById("inputSearch");
const inputDate = document.getElementById("inputDate");
const travelMain = document.getElementById("travelMain");

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
    const diffDay = convertMiliToDay(diff);
    const searchRes = await searchCity(inputText);
    if (!searchRes) {
      alert("Error finding location.");
      return;
    }
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
