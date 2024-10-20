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

const apiKey = process.env.API_KEY;
const endPoint = "https://api.meaningcloud.com/sentiment-2.1";

app.get("/", function (req, res) {
  res.send(
    "This is the server API page, you may access its services via the client app."
  );
});

// POST Route
app.post("/submit", async function (req, res, next) {
  const input = req?.body?.input ?? "";
  console.log(input);
  if (input.trim() === "") {
    var e = new Error("Missing input");
    e.status = 400;
    next(e);
    return;
  }
  const meaningData = await getMeaningData(input);
  const { data } = meaningData;
  const resResult = {
    polarity: data.agreement,
    subjectivity: data.subjectivity,
    text: input,
    confidence: data.confidence,
    irony: data.irony,
    model: data.model,
    score_tag: data.score_tag,
  };
  res.status(200).send({ message: JSON.stringify(resResult) });
});

// Designates what port the app will listen to for incoming requests
app.listen(8000, function () {
  console.log("Example app listening on port 8000!");
});

function getMeaningData(input) {
  const form = new FormData();
  form.append("key", apiKey);
  form.append("txt", input);
  const response = axios
    .post(endPoint, form, { ...form.getHeaders() })
    .then((res) => res)
    .catch((err) => err);
  return response;
}

export { app };
