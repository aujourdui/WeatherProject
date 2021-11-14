import apiKey from "./public/js/config.js";
import express from "express";
import alert from "alert";
import https from "https";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  const originalQuery = req.body.cityName;
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  const query = capitalizeFirstLetter(originalQuery);
  const unit = "metric";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=${unit}`;

  https.get(url, function (response) {
    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      if (query === weatherData.name) {
        var temp = weatherData.main.temp;
        var maxTemp = weatherData.main.temp_max;
        var minTemp = weatherData.main.temp_min;
        var weatherDescription = weatherData.weather[0].description;
        const icon = weatherData.weather[0].icon;
        var imageURL = `http://openweathermap.org/img/wn/${icon}@2x.png`;

        res.write(
          `<h1 style="font-size:3rem;color:#0C2D48;font-family:Arial, Helvetica,sans-serif;text-align:center;margin-top: 3rem">${query}</h1>`
        );
        res.write(
          `
          <h1 style="font-family:Arial, Helvetica,sans-serif;text-align: center;margin-bottom: 0;color:#B91646;">
            Current
          </h1>
          <div>
          <hr style="border: 1px dotted gray;width:50%">
            <h1 style="color:darkblue;font-family:Arial, Helvetica,sans-serif;text-align:center;margin-bottom:0;">
              Weather: ${weatherDescription}
            </h1>
            <img style="display: block;margin-left:auto;margin-right:auto;width:10%;" src=${imageURL}>
            <h1 style="color:gray;font-family:Arial, Helvetica,sans-serif;text-align:center;margin-top:0;">
              Temperature: ${temp} &#8451;
            </h1>
            <hr style="border: 1px dotted gray;width:50%;">
          </div>`
        );

        res.write(
          `
          <h1 style="font-family:Arial, Helvetica,sans-serif;text-align: center;margin-bottom: 0;margin-top: 3rem;color:#B91646;">
            Temprerature detail
          </h1>
          <div>
          <hr style="border: 1px dotted gray;width:50%">
            <h1 style="color:darkblue;font-family:Arial, Helvetica,sans-serif;text-align:center;margin-bottom:0;">
              Max: ${maxTemp} &#8451
            </h1>
            <h1 style="color:#8E0505;font-family:Arial, Helvetica,sans-serif;text-align:center;margin-top:0;">
              Min: ${minTemp} &#8451;
            </h1>
            <hr style="border: 1px dotted gray;width:50%; margin-bottom: 2rem">
          </div>`
        );

        res.write(
          `<form onSubmit="{e => e.preventDefault}" onmouseover="" style="text-align: center;">
          <button type="submit"; name="button" style="font-size:1rem;background-color:#ECF87F;text-decoration:none;padding:10px 32px;border:none;cursor: pointer;">Home</button>
          </form>`
        );
        res.send();
      } else if (query == "") {
        alert("Please enter any city name");
        res.redirect("/");
      } else {
        alert("This city name is not found");
        res.redirect("/");
      }
    });
  });
});

app.listen(3000, function () {
  console.log("Server is running on port 3000");
});
