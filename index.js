const fetch = require("node-fetch");
const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.set("view engine", "html");
app.engine("html", require("ejs").renderFile);

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/forecast", async (req, res) => {
  const { cityname } = req.body;
  try {
    const request = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${process.env.API_KEY}`);
    const forecast = await request.json();

    const info = {
      name: forecast.name,
      main: forecast.weather[0].main,
      desc: forecast.weather[0].description,
      windSpeed: forecast.wind.speed,
      cloudsAverage: forecast.clouds.all
    }

    res.render('forecast', {info});
  } catch (err) {
    res.send("An error occured");
  }
});


app.listen(3000, () => {
  console.log("Weather app is running!");
});