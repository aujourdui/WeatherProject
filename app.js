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

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
  const originalQuery = req.body.cityName;
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  const query = capitalizeFirstLetter(originalQuery);
  const unit = "metric";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=${unit}`;

  // current weather
  https.get(url, (response) => {
    response.on("data", (data) => {
      const weatherData = JSON.parse(data);
      const cityName = weatherData.name;

      if (query === cityName) {
        const changeCityName = cityName.toLowerCase().replace(" ", "");
        const country = weatherData.sys.country;
        const temp = weatherData.main.temp.toFixed(1);
        const maxTemp = weatherData.main.temp_max.toFixed(1);
        const minTemp = weatherData.main.temp_min.toFixed(1);
        const weatherDescription = weatherData.weather[0].description;
        const icon = weatherData.weather[0].icon;
        const imageURL = `http://openweathermap.org/img/wn/${icon}@2x.png`;

        res.write(
          `
            <head>
              <title>Weather App</title>
              <link rel="stylesheet" href="css/weather.css" />
              <link rel="icon" type="image/jpg" href="/images/w_logo.jpg" />
            </head>
          `
        );

        res.write(
          `
            <h1 id="city-name">${cityName} / ${country}
              <div id="city-background" style="background-image: url(https://source.unsplash.com/1200x200/?${changeCityName};">
              </div>
            </h1>
          `
        );
        res.write(
          `
            <h1 class="title-red" style="margin-bottom:0;">
              Current
            </h1>
            <div>
              <hr class="border">
              <h1 class="title-blue" style="margin-bottom:0;">
                ${weatherDescription}
              </h1>
              <img class="img-current" src=${imageURL}>
              <h1 class="temp" style="margin-top:0;">
                ${temp} &#8451;
              </h1>
            </div>
          `
        );

        res.write(
          `
            <h1 class="title-red" style="margin: 3rem 0 0 0;">
              Temperature detail
            </h1>
            <div>
              <hr class="border">
              <h1 class="title-blue" style="margin-bottom:0;">
                Max: ${maxTemp} &#8451;
              </h1>
              <h1 class="title-red" style="margin-top:0;">
                Min: ${minTemp} &#8451;
              </h1>
              <hr class="border" style="margin-bottom: 2rem">
            </div>
          `
        );

        res.write(
          `
            <form onSubmit="{e => e.preventDefault}" style="text-align: center;">
              <button type="submit"; name="button" class="home">
                Home
              </button>
            </form>
          `
        );

        //  daily weather
        const lon = weatherData.coord.lon;
        const lat = weatherData.coord.lat;

        const urlGeo = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=${unit}&appid=6ead27bdb26041ed3ea800802ff72381`;

        https.get(urlGeo, (response) => {
          let resultData = "";
          response.on("data", (data) => (resultData += data));
          response.on("end", () => {
            const weatherData = JSON.parse(resultData);

            // basic daily data
            let dailyTempMinList = [];
            let dailyTempMaxList = [];
            let dailyTempDescriptionList = [];
            let dailyIconList = [];
            let dailyImageUrlList = [];

            // related to date
            let datesList = [];
            let monthsList = [];
            let daysList = [];
            let refinedDatesList = [];

            const weekday = new Array(8);
            weekday[0] = "(Sun)";
            weekday[1] = "(Mon)";
            weekday[2] = "(Tue)";
            weekday[3] = "(Wed)";
            weekday[4] = "(Thu)";
            weekday[5] = "(Fri)";
            weekday[6] = "(Sat)";
            weekday[7] = "(Sun)";

            // create whole daily data list
            for (let i = 0; i < 8; i++) {
              dailyTempMinList.push(weatherData.daily[i].temp.min.toFixed(1));
              dailyTempMaxList.push(weatherData.daily[i].temp.max.toFixed(1));
              dailyTempDescriptionList.push(
                weatherData.daily[i].weather[0].description
              );
              dailyIconList.push(weatherData.daily[i].weather[0].icon);
              dailyImageUrlList.push(
                `http://openweathermap.org/img/wn/${weatherData.daily[i].weather[0].icon}@2x.png`
              );

              datesList.push(
                new Date(new Date().getTime() + 24 * 60 * 60 * 1000 * i)
              );
              weekday[datesList[0].getDay() + i];
              monthsList.push(datesList[i].getMonth() + 1);
              daysList.push(datesList[i].getDate());
              refinedDatesList.push(
                `${monthsList[i]}/${daysList[i]}${weekday[i]}`
              );
            }

            // display daily data lists
            res.write(
              `
                <h1 class="title-red" style="margin: 4rem 0 0 0">
                  Daily
                </h1>
                <hr class="border">
              `
            );

            for (let i = 0; i < 8; i++) {
              res.write(
                `
                  <div class="daily-element-center">
                    <h2 class="date">
                      ${refinedDatesList[i]}
                    </h2>
                    <img style="width:60px;" src=${dailyImageUrlList[i]}>
                    <h2 class="daily-temp">
                      ${dailyTempMaxList[i]} / ${dailyTempMinList[i]} &#8451
                    </h2>
                    <h2 class="daily-description">
                      ${dailyTempDescriptionList[i]}
                    </h2>
                  </div>
                `
              );
            }

            res.write(
              `
                <hr class="border">
              `
            );
            res.write(
              `
                <form onSubmit="{e => e.preventDefault}" style="text-align: center;">
                  <button type="submit"; name="button" class="home">
                    Home
                  </button>
                </form>
              `
            );

            // hourly weather

            // basic hourly data
            let hourlyTempList = [];
            let hourlyDescriptionList = [];
            let hourlyIconList = [];
            let hourlyImageUrlList = [];

            // get am/pm time
            let hourList = [];
            let ampmList = [];
            let ampmHourList = [];

            // display am/pm time
            let refinedHourList = [];

            // create whole hourly data list
            for (let i = 0; i < 24; i++) {
              hourlyTempList.push(weatherData.hourly[i].temp.toFixed(1));
              hourlyDescriptionList.push(
                weatherData.hourly[i].weather[0].description
              );
              hourlyIconList.push(weatherData.hourly[i].weather[0].icon);
              hourlyImageUrlList.push(
                `http://openweathermap.org/img/wn/${weatherData.hourly[i].weather[0].icon}@2x.png`
              );

              let hours = datesList[0].getHours() + i;
              hourList.push(hours);
              ampmList.push(hours >= 12 ? "pm" : "am");
              hours = hours % 12;
              hours = hours ? hours : 12;
              ampmHourList.push(hours);

              refinedHourList.push(`${ampmHourList[i]}:00${ampmList[i]}`);
            }

            // display 24hours(optional)
            // let refined24HoursList = [];
            // for (let i = 0; i < 24; i++) {
            //   refined24HoursList.push(`${hourList[i]}:00`);
            // }

            // display hourly data
            res.write(
              `
                <h1 class="title-red" style="margin: 4rem 0 0 0;">
                  Hourly
                </h1>
                <hr class="border">
              `
            );
            for (let i = 0; i < 24; i++) {
              res.write(
                `
                  <div class="hourly-element-center">
                      <h3 class="hour">
                        ${refinedHourList[i]}
                      </h3>
                      <img style="width:40px;" src=${hourlyImageUrlList[i]}>
                      <h3 class="hourly-temp">
                        ${hourlyTempList[i]} &#8451;
                      </h3>
                      <h3 class="hourly-description">
                        ${hourlyDescriptionList[i]}
                      </h3>
                  </div>
                `
              );
            }
            res.write(
              `
                <hr class="border" style="margin-bottom: 2rem;">
              `
            );
            res.write(
              `
                <form onSubmit="{e => e.preventDefault}" style="text-align: center;margin-bottom: 0 0 3rem 0">
                  <button class="home" type="submit"; name="button">
                    Home
                  </button>
                </form>
              `
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
