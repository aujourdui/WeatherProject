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

  // current weather
  https.get(url, function (response) {
    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      if (query === weatherData.name) {
        const temp = weatherData.main.temp;
        const maxTemp = weatherData.main.temp_max;
        const minTemp = weatherData.main.temp_min;
        const weatherDescription = weatherData.weather[0].description;
        const icon = weatherData.weather[0].icon;
        const imageURL = `http://openweathermap.org/img/wn/${icon}@2x.png`;

        res.write(
          `<h1 style="font-size:3rem;color:#0C2D48;font-family:Arial, Helvetica,sans-serif;text-align:center;margin-top: 3rem">${query}</h1>`
        );
        res.write(
          `
          <h1 style="font-family:Arial, Helvetica,sans-serif;text-align: center;margin-bottom: 0;color:#B91646;">
            Current
          </h1>
          <div>
          <hr style="border: 1px dotted gray;width:600px">
            <h1 style="color:darkblue;font-family:Arial, Helvetica,sans-serif;text-align:center;margin-bottom:0;">
              ${weatherDescription}
            </h1>
            <img style="display: block;margin-left:auto;margin-right:auto;width:10%;" src=${imageURL}>
            <h1 style="color:gray;font-family:Arial, Helvetica,sans-serif;text-align:center;margin-top:0;">
              ${temp} &#8451;
            </h1>
          </div>`
        );

        res.write(
          `
          <h1 style="font-family:Arial, Helvetica,sans-serif;text-align: center;margin-bottom: 0;margin-top: 3rem;color:#B91646;">
            Temprerature detail
          </h1>
          <div>
          <hr style="border: 1px solid gray;width:300px">
            <h1 style="color:darkblue;font-family:Arial, Helvetica,sans-serif;text-align:center;margin-bottom:0;">
              Max: ${maxTemp} &#8451
            </h1>
            <h1 style="color:#8E0505;font-family:Arial, Helvetica,sans-serif;text-align:center;margin-top:0;">
              Min: ${minTemp} &#8451;
            </h1>
            <hr style="border: 1px dotted gray;width:600px; margin-bottom: 2rem">
          </div>`
        );

        res.write(
          `<form onSubmit="{e => e.preventDefault}" onmouseover="" style="text-align: center;">
          <button type="submit"; name="button" style="font-size:1rem;background-color:#ECF87F;text-decoration:none;padding:10px 32px;border:none;cursor: pointer;">Home</button>
          </form>`
        );
        // res.send();
        // daily weather
        const lon = weatherData.coord.lon;
        const lat = weatherData.coord.lat;

        const urlDaily = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=${unit}&appid=6ead27bdb26041ed3ea800802ff72381`;

        // const urlDaily = `https://api.openweathermap.org/data/2.5/onecall?lat=49.2497&lon=-123.1193&units=${unit}&appid=6ead27bdb26041ed3ea800802ff72381`;

        https.get(urlDaily, function (response) {
          // console.log(response.statusCode);
          let resultData = "";
          response.on("data", (data) => (resultData += data));
          response.on("end", () => {
            const weatherData = JSON.parse(resultData);
            // if (query === weatherData.name) {
            const todayTempMin = weatherData.daily[0].temp.min;
            const todayTempMax = weatherData.daily[0].temp.max;
            const todayWeatherDescription =
              weatherData.daily[0].weather[0].description;
            const todayWeatherIcon = weatherData.daily[0].weather[0].icon;
            const todayWeatherImageURL = `http://openweathermap.org/img/wn/${todayWeatherIcon}@2x.png`;
            const oneDayLaterTempMin = weatherData.daily[1].temp.min;
            const oneDayLaterTempMax = weatherData.daily[1].temp.max;
            const oneDayLaterWeatherDescription =
              weatherData.daily[1].weather[0].description;
            const oneDayLaterWeatherIcon = weatherData.daily[1].weather[0].icon;
            const oneDayLaterWeatherImageURL = `http://openweathermap.org/img/wn/${oneDayLaterWeatherIcon}@2x.png`;
            const twoDaysLaterTempMin = weatherData.daily[2].temp.min;
            const twoDaysLaterTempMax = weatherData.daily[2].temp.max;
            const twoDaysLaterWeatherDescription =
              weatherData.daily[2].weather[0].description;
            const twoDaysLaterWeatherIcon =
              weatherData.daily[2].weather[0].icon;
            const twoDaysLaterWeatherImageURL = `http://openweathermap.org/img/wn/${twoDaysLaterWeatherIcon}@2x.png`;
            const threeDaysLaterTempMin = weatherData.daily[3].temp.min;
            const threeDaysLaterTempMax = weatherData.daily[3].temp.max;
            const threeDaysLaterWeatherDescription =
              weatherData.daily[3].weather[0].description;
            const threeDaysLaterWeatherIcon =
              weatherData.daily[3].weather[0].icon;
            const threeDaysLaterWeatherImageURL = `http://openweathermap.org/img/wn/${threeDaysLaterWeatherIcon}@2x.png`;
            const fourDaysLaterTempMin = weatherData.daily[4].temp.min;
            const fourDaysLaterTempMax = weatherData.daily[4].temp.max;
            const fourDaysLaterWeatherDescription =
              weatherData.daily[4].weather[0].description;
            const fourDaysLaterWeatherIcon =
              weatherData.daily[4].weather[0].icon;
            const fourDaysLaterWeatherImageURL = `http://openweathermap.org/img/wn/${fourDaysLaterWeatherIcon}@2x.png`;
            const fiveDaysLaterTempMin = weatherData.daily[5].temp.min;
            const fiveDaysLaterTempMax = weatherData.daily[5].temp.max;
            const fiveDaysLaterWeatherDescription =
              weatherData.daily[5].weather[0].description;
            const fiveDaysLaterWeatherIcon =
              weatherData.daily[5].weather[0].icon;
            const fiveDaysLaterWeatherImageURL = `http://openweathermap.org/img/wn/${fiveDaysLaterWeatherIcon}@2x.png`;
            const sixDaysLaterTempMin = weatherData.daily[6].temp.min;
            const sixDaysLaterTempMax = weatherData.daily[6].temp.max;
            const sixDaysLaterWeatherIcon =
              weatherData.daily[6].weather[0].icon;
            const sixDaysLaterWeatherDescription =
              weatherData.daily[6].weather[0].description;
            const sixDaysLaterWeatherImageURL = `http://openweathermap.org/img/wn/${sixDaysLaterWeatherIcon}@2x.png`;
            const sevenDaysLaterTempMin = weatherData.daily[7].temp.min;
            const sevenDaysLaterTempMax = weatherData.daily[7].temp.max;
            const sevenDaysLaterWeatherDescription =
              weatherData.daily[7].weather[0].description;
            const sevenDaysLaterWeatherIcon =
              weatherData.daily[7].weather[0].icon;
            const sevenDaysLaterWeatherImageURL = `http://openweathermap.org/img/wn/${sevenDaysLaterWeatherIcon}@2x.png`;

            res.write(
              `
              <h1 style="font-family:Arial, Helvetica,sans-serif;text-align: center;margin: 4rem 0 0 0;color:#B91646;">
                Weekly
              </h1>
              <hr style="border: 1px dotted gray;width:600px">
              <div>
                <div style="display: flex;align-item: center;justify-content: center">
                  <h2 style="color:blue;font-family:Arial, Helvetica,sans-serif;padding: 0 1rem 0 0;margin: 10px 0 10px 0">Today </h2>
                  <img style="width:60px;" src=${todayWeatherImageURL}>
                  <h2 style="color:gray;font-family:Arial, Helvetica,sans-serif;text-align:center;margin: 10px 0 10px 0">
                  ${todayTempMax} / ${todayTempMin} &#8451;
                  </h2>
                  <h2 style="color:darkblue;font-family:Arial, Helvetica,sans-serif;text-align:center;padding: 0 0 0 2rem;margin: 10px 0 10px 0">${todayWeatherDescription}</h2>
                </div>
                <div style="display: flex;align-item: center;justify-content: center;">
                  <h2 style="color:blue;font-family:Arial, Helvetica,sans-serif;padding: 0 1rem 0 0;margin: 10px 0 10px 0">Tomorrow </h2>
                  <img style="width:60px;" src=${oneDayLaterWeatherImageURL}>
                  <h2 style="color:gray;font-family:Arial, Helvetica,sans-serif;text-align:center;margin: 10px 0 10px 0">
                  ${oneDayLaterTempMax} / ${oneDayLaterTempMin} &#8451;
                  </h2>
                  <h2 style="color:darkblue;font-family:Arial, Helvetica,sans-serif;text-align:center;padding: 0 0 0 2rem;margin: 10px 0 10px 0">${oneDayLaterWeatherDescription}</h2>
                </div>
                <div style="display: flex;align-item: center;justify-content: center;margin: 10px 0 10px 0">
                  <h2 style="color:blue;font-family:Arial, Helvetica,sans-serif;padding: 0 1rem 0 0;margin: 10px 0 10px 0">2days later</h2>
                  <img style="width:60px;" src=${twoDaysLaterWeatherImageURL}>
                  <h2 style="color:gray;font-family:Arial, Helvetica,sans-serif;text-align:center;margin: 10px 0 10px 0">
                  ${twoDaysLaterTempMax} / ${twoDaysLaterTempMin} &#8451;
                  </h2>
                  <h2 style="color:darkblue;font-family:Arial, Helvetica,sans-serif;text-align:center;padding: 0 0 0 2rem;margin: 10px 0 10px 0">${twoDaysLaterWeatherDescription}</h2>
                </div>
                <div style="display: flex;align-item: center;justify-content: center">
                  <h2 style="color:blue;font-family:Arial, Helvetica,sans-serif;padding: 0 1rem 0 0;margin: 10px 0 10px 0">3days later</h2>
                  <img style="width:60px;" src=${threeDaysLaterWeatherImageURL}>
                  <h2 style="color:gray;font-family:Arial, Helvetica,sans-serif;text-align:center;margin: 10px 0 10px 0;">
                  ${threeDaysLaterTempMax} / ${threeDaysLaterTempMin} &#8451;
                  </h2>
                  <h2 style="color:darkblue;font-family:Arial, Helvetica,sans-serif;text-align:center;padding: 0 0 0 2rem;margin: 10px 0 10px 0;">${threeDaysLaterWeatherDescription}</h2>
                </div>
                <div style="display: flex;align-item: center;justify-content: center">
                  <h2 style="color:blue;font-family:Arial, Helvetica,sans-serif;padding: 0 1rem 0 0;margin: 10px 0 10px 0;">4days later</h2>
                  <img style="width:60px;" src=${fourDaysLaterWeatherImageURL}>
                  <h2 style="color:gray;font-family:Arial, Helvetica,sans-serif;text-align:center;margin: 10px 0 10px 0;">
                  ${fourDaysLaterTempMax} / ${fourDaysLaterTempMin} &#8451;
                  </h2>
                  <h2 style="color:darkblue;font-family:Arial, Helvetica,sans-serif;text-align:center;padding: 0 0 0 2rem;margin: 10px 0 10px 0;">${fourDaysLaterWeatherDescription}</h2>
                </div>
                <div style="display: flex;align-item: center;justify-content: center">
                  <h2 style="color:blue;font-family:Arial, Helvetica,sans-serif;padding: 0 1rem 0 0;margin: 10px 0 10px 0;">5days later</h2>
                  <img style="width:60px;" src=${fiveDaysLaterWeatherImageURL}>
                  <h2 style="color:gray;font-family:Arial, Helvetica,sans-serif;text-align:center;margin: 10px 0 10px 0;">
                  ${fiveDaysLaterTempMax} / ${fiveDaysLaterTempMin} &#8451;
                  </h2>
                  <h2 style="color:darkblue;font-family:Arial, Helvetica,sans-serif;text-align:center;padding: 0 0 0 2rem;margin: 10px 0 10px 0;">${fiveDaysLaterWeatherDescription}</h2>
                </div>
                <div style="display: flex;align-item: center;justify-content: center">
                  <h2 style="color:blue;font-family:Arial, Helvetica,sans-serif;padding: 0 1rem 0 0;margin: 10px 0 10px 0;">6days later</h2>
                  <img style="width:60px;" src=${sixDaysLaterWeatherImageURL}>
                  <h2 style="color:gray;font-family:Arial, Helvetica,sans-serif;text-align:center;margin: 10px 0 10px 0;">
                  ${sixDaysLaterTempMax} / ${sixDaysLaterTempMin} &#8451;
                  </h2>
                  <h2 style="color:darkblue;font-family:Arial, Helvetica,sans-serif;text-align:center;padding: 0 0 0 2rem;margin: 10px 0 10px 0;">${sixDaysLaterWeatherDescription}</h2>
                </div>
                <div style="display: flex;align-item: center;justify-content: center">
                  <h2 style="color:blue;font-family:Arial, Helvetica,sans-serif;padding: 0 1rem 0 0;margin: 10px 0 10px 0;">7days later</h2>
                  <img style="width:60px;" src=${sevenDaysLaterWeatherImageURL}>
                  <h2 style="color:gray;font-family:Arial, Helvetica,sans-serif;text-align:center;margin: 10px 0 10px 0;">
                  ${sevenDaysLaterTempMax} / ${sevenDaysLaterTempMin} &#8451;
                  </h2>
                  <h2 style="color:darkblue;font-family:Arial, Helvetica,sans-serif;text-align:center;padding: 0 0 0 2rem;margin: 10px 0 10px 0;">${sevenDaysLaterWeatherDescription}</h2>
                </div>
              </div>
            <hr style="border: 1px dotted gray;width:600px;margin-bottom: 2rem;">
            </div>
            `
            );

            res.write(
              `<form onSubmit="{e => e.preventDefault}" onmouseover="" style="text-align: center;">
              <button type="submit"; name="button" style="font-size:1rem;background-color:#ECF87F;text-decoration:none;padding:10px 32px;border:none;cursor: pointer;">Home</button>
              </form>`
            );
            res.send();
          });
        });
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
