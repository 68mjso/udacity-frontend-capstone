var path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const axios = require("axios");
const FormData = require("form-data");
dotenv.config();

const app = express();

const cors = require("cors");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

console.log(__dirname);

// Variables for url and api key

const geoUsername = process.env.GEO_USERNAME;
const weatherAPIKey = process.env.WAETHER_API_KEY;
const geoEndPoint = `http://api.geonames.org/searchJSON`;
const weatherEndPoint = `http://api.weatherbit.io/v2.0/forecast/daily?key=${weatherAPIKey}`;

app.get("/", function (req, res) {
  res.send(
    "This is the server API page, you may access its services via the client app."
  );
});

// POST Route
app.get("/search-city", async function (req, res, next) {
  const input = req?.query?.input ?? "";
  if (input.trim() === "") {
    var e = new Error("Missing input");
    e.status = 400;
    next(e);
    return;
  }
  const geoRes = await getGeoData(input);
  const { geonames } = geoRes;
  let result = null;
  if (geonames.length > 0) {
    result = geonames[0];
  }
  res.status(200).send({ status: 200, data: result });
});

// Designates what port the app will listen to for incoming requests
app.listen(8000, function () {
  console.log("Example app listening on port 8000!");
});

function getWeather(lat, lon) {}

function getGeoData(input) {
  const response = axios
    .get(`${geoEndPoint}?username=${geoUsername}&maxRows=1&q=${input}`)
    .then((res) => res.data)
    .catch((err) => err);
  return response;
}

// export { app };
