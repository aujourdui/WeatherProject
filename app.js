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
      // console.log(weatherData.coord.lon);
      // console.log(weatherData.coord.lat);
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

        //  daily weather

        const lon = weatherData.coord.lon;
        const lat = weatherData.coord.lat;

        const urlGeo = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=${unit}&appid=6ead27bdb26041ed3ea800802ff72381`;

        https.get(urlGeo, function (response) {
          // console.log(response.statusCode);
          let resultData = "";
          response.on("data", (data) => (resultData += data));
          response.on("end", () => {
            const weatherData = JSON.parse(resultData);
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

            const currentDate = new Date(
              new Date().getTime() + 24 * 60 * 60 * 1000
            );
            const oneDateLater = new Date(
              new Date().getTime() + 24 * 60 * 60 * 1000 * 2
            );
            const twoDatesLater = new Date(
              new Date().getTime() + 24 * 60 * 60 * 1000 * 3
            );
            const threeDatesLater = new Date(
              new Date().getTime() + 24 * 60 * 60 * 1000 * 4
            );
            const fourDatesLater = new Date(
              new Date().getTime() + 24 * 60 * 60 * 1000 * 5
            );
            const fiveDatesLater = new Date(
              new Date().getTime() + 24 * 60 * 60 * 1000 * 6
            );
            const sixDatesLater = new Date(
              new Date().getTime() + 24 * 60 * 60 * 1000 * 7
            );
            const sevenDatesLater = new Date(
              new Date().getTime() + 24 * 60 * 60 * 1000 * 8
            );

            const d = new Date();

            const weekday = new Array(7);
            weekday[0] = "(Sun)";
            weekday[1] = "(Mon)";
            weekday[2] = "(Tue)";
            weekday[3] = "(Wed)";
            weekday[4] = "(Thu)";
            weekday[5] = "(Fri)";
            weekday[6] = "(Sat)";

            // const dayOfWeek = weekday[d.getDay()];
            const sunday = weekday[d.getDay() - 1];
            const monday = weekday[d.getDay()];
            const tuesday = weekday[d.getDay() + 1];
            const wednesday = weekday[d.getDay() + 2];
            const thursday = weekday[d.getDay() + 3];
            const friday = weekday[d.getDay() + 4];
            const saturday = weekday[d.getDay() + 5];

            const month = currentDate.getMonth() + 1;

            const day = currentDate.getDate() - 1;
            const oneDayLater = oneDateLater.getDate() - 1;
            const twoDaysLater = twoDatesLater.getDate() - 1;
            const threeDaysLater = threeDatesLater.getDate() - 1;
            const fourDaysLater = fourDatesLater.getDate() - 1;
            const fiveDaysLater = fiveDatesLater.getDate() - 1;
            const sixDaysLater = sixDatesLater.getDate() - 1;
            const sevenDaysLater = sevenDatesLater.getDate() - 1;

            // console.log(`${month}-${day} ${hours}`);
            const date = `${month}/${day}${monday}`;
            const oneDayLaterDate = `${month}/${oneDayLater}${tuesday}`;
            const twoDaysLaterDate = `${month}/${twoDaysLater}${wednesday}`;
            const threeDaysLaterDate = `${month}/${threeDaysLater}${thursday}`;
            const fourDaysLaterDate = `${month}/${fourDaysLater}${friday}`;
            const fiveDaysLaterDate = `${month}/${fiveDaysLater}${saturday}`;
            const sixDaysLaterDate = `${month}/${sixDaysLater}${sunday}`;
            const sevenDaysLaterDate = `${month}/${sevenDaysLater}${monday}`;

            res.write(
              `
                  <h1 style="font-family:Arial, Helvetica,sans-serif;text-align: center;margin: 4rem 0 0 0;color:#B91646;">
                    Daily
                  </h1>
                  <hr style="border: 1px dotted gray;width:600px">
                  <div>
                    <div style="display: flex;align-item: center;justify-content: center">
                      <h2 style="color:blue;font-family:Arial, Helvetica,sans-serif;padding: 0 1rem 0 0;margin: 10px 0 10px 0">${date} </h2>
                      <img style="width:60px;" src=${todayWeatherImageURL}>
                      <h2 style="color:gray;font-family:Arial, Helvetica,sans-serif;text-align:center;margin: 10px 0 10px 0">
                      ${todayTempMax} / ${todayTempMin} &#8451;
                      </h2>
                      <h2 style="color:darkblue;font-family:Arial, Helvetica,sans-serif;text-align:center;padding: 0 0 0 2rem;margin: 10px 0 10px 0">${todayWeatherDescription}</h2>
                    </div>
                    <div style="display: flex;align-item: center;justify-content: center;">
                      <h2 style="color:blue;font-family:Arial, Helvetica,sans-serif;padding: 0 1rem 0 0;margin: 10px 0 10px 0">${oneDayLaterDate} </h2>
                      <img style="width:60px;" src=${oneDayLaterWeatherImageURL}>
                      <h2 style="color:gray;font-family:Arial, Helvetica,sans-serif;text-align:center;margin: 10px 0 10px 0">
                      ${oneDayLaterTempMax} / ${oneDayLaterTempMin} &#8451;
                      </h2>
                      <h2 style="color:darkblue;font-family:Arial, Helvetica,sans-serif;text-align:center;padding: 0 0 0 2rem;margin: 10px 0 10px 0">${oneDayLaterWeatherDescription}</h2>
                    </div>
                    <div style="display: flex;align-item: center;justify-content: center;margin: 10px 0 10px 0">
                      <h2 style="color:blue;font-family:Arial, Helvetica,sans-serif;padding: 0 1rem 0 0;margin: 10px 0 10px 0">${twoDaysLaterDate}</h2>
                      <img style="width:60px;" src=${twoDaysLaterWeatherImageURL}>
                      <h2 style="color:gray;font-family:Arial, Helvetica,sans-serif;text-align:center;margin: 10px 0 10px 0">
                      ${twoDaysLaterTempMax} / ${twoDaysLaterTempMin} &#8451;
                      </h2>
                      <h2 style="color:darkblue;font-family:Arial, Helvetica,sans-serif;text-align:center;padding: 0 0 0 2rem;margin: 10px 0 10px 0">${twoDaysLaterWeatherDescription}</h2>
                    </div>
                    <div style="display: flex;align-item: center;justify-content: center">
                      <h2 style="color:blue;font-family:Arial, Helvetica,sans-serif;padding: 0 1rem 0 0;margin: 10px 0 10px 0">${threeDaysLaterDate}</h2>
                      <img style="width:60px;" src=${threeDaysLaterWeatherImageURL}>
                      <h2 style="color:gray;font-family:Arial, Helvetica,sans-serif;text-align:center;margin: 10px 0 10px 0;">
                      ${threeDaysLaterTempMax} / ${threeDaysLaterTempMin} &#8451;
                      </h2>
                      <h2 style="color:darkblue;font-family:Arial, Helvetica,sans-serif;text-align:center;padding: 0 0 0 2rem;margin: 10px 0 10px 0;">${threeDaysLaterWeatherDescription}</h2>
                    </div>
                    <div style="display: flex;align-item: center;justify-content: center">
                      <h2 style="color:blue;font-family:Arial, Helvetica,sans-serif;padding: 0 1rem 0 0;margin: 10px 0 10px 0;">${fourDaysLaterDate}</h2>
                      <img style="width:60px;" src=${fourDaysLaterWeatherImageURL}>
                      <h2 style="color:gray;font-family:Arial, Helvetica,sans-serif;text-align:center;margin: 10px 0 10px 0;">
                      ${fourDaysLaterTempMax} / ${fourDaysLaterTempMin} &#8451;
                      </h2>
                      <h2 style="color:darkblue;font-family:Arial, Helvetica,sans-serif;text-align:center;padding: 0 0 0 2rem;margin: 10px 0 10px 0;">${fourDaysLaterWeatherDescription}</h2>
                    </div>
                    <div style="display: flex;align-item: center;justify-content: center">
                      <h2 style="color:blue;font-family:Arial, Helvetica,sans-serif;padding: 0 1rem 0 0;margin: 10px 0 10px 0;">${fiveDaysLaterDate}</h2>
                      <img style="width:60px;" src=${fiveDaysLaterWeatherImageURL}>
                      <h2 style="color:gray;font-family:Arial, Helvetica,sans-serif;text-align:center;margin: 10px 0 10px 0;">
                      ${fiveDaysLaterTempMax} / ${fiveDaysLaterTempMin} &#8451;
                      </h2>
                      <h2 style="color:darkblue;font-family:Arial, Helvetica,sans-serif;text-align:center;padding: 0 0 0 2rem;margin: 10px 0 10px 0;">${fiveDaysLaterWeatherDescription}</h2>
                    </div>
                    <div style="display: flex;align-item: center;justify-content: center">
                      <h2 style="color:blue;font-family:Arial, Helvetica,sans-serif;padding: 0 1rem 0 0;margin: 10px 0 10px 0;">${sixDaysLaterDate}</h2>
                      <img style="width:60px;" src=${sixDaysLaterWeatherImageURL}>
                      <h2 style="color:gray;font-family:Arial, Helvetica,sans-serif;text-align:center;margin: 10px 0 10px 0;">
                      ${sixDaysLaterTempMax} / ${sixDaysLaterTempMin} &#8451;
                      </h2>
                      <h2 style="color:darkblue;font-family:Arial, Helvetica,sans-serif;text-align:center;padding: 0 0 0 2rem;margin: 10px 0 10px 0;">${sixDaysLaterWeatherDescription}</h2>
                    </div>
                    <div style="display: flex;align-item: center;justify-content: center">
                      <h2 style="color:blue;font-family:Arial, Helvetica,sans-serif;padding: 0 1rem 0 0;margin: 10px 0 10px 0;">${sevenDaysLaterDate}</h2>
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

            // hourly weather

            const currentTemp = weatherData.hourly[0].temp;
            const currentDescription =
              weatherData.hourly[0].weather[0].description;
            const currentWeatherIcon = weatherData.hourly[0].weather[0].icon;
            const currentImageURL = `http://openweathermap.org/img/wn/${currentWeatherIcon}@2x.png`;
            const oneHourLaterTemp = weatherData.hourly[1].temp;
            const oneHourLaterDescription =
              weatherData.hourly[1].weather[0].description;
            const oneHourLaterWeatherIcon =
              weatherData.hourly[1].weather[0].icon;
            const oneHourLaterImageURL = `http://openweathermap.org/img/wn/${oneHourLaterWeatherIcon}@2x.png`;
            const twoHoursLaterTemp = weatherData.hourly[2].temp;
            const twoHoursLaterDescription =
              weatherData.hourly[2].weather[0].description;
            const twoHoursLaterWeatherIcon =
              weatherData.hourly[2].weather[0].icon;
            const twoHoursLaterImageURL = `http://openweathermap.org/img/wn/${twoHoursLaterWeatherIcon}@2x.png`;
            const threeHoursLaterTemp = weatherData.hourly[3].temp;
            const threeHoursLaterDescription =
              weatherData.hourly[3].weather[0].description;
            const threeHoursLaterWeatherIcon =
              weatherData.hourly[3].weather[0].icon;
            const threeHoursLaterImageURL = `http://openweathermap.org/img/wn/${threeHoursLaterWeatherIcon}@2x.png`;
            const fourHoursLaterTemp = weatherData.hourly[4].temp;
            const fourHoursLaterDescription =
              weatherData.hourly[4].weather[0].description;
            const fourHoursLaterWeatherIcon =
              weatherData.hourly[4].weather[0].icon;
            const fourHoursLaterImageURL = `http://openweathermap.org/img/wn/${fourHoursLaterWeatherIcon}@2x.png`;
            const fiveHoursLaterTemp = weatherData.hourly[5].temp;
            const fiveHoursLaterDescription =
              weatherData.hourly[5].weather[0].description;
            const fiveHoursLaterWeatherIcon =
              weatherData.hourly[5].weather[0].icon;
            const fiveHoursLaterImageURL = `http://openweathermap.org/img/wn/${fiveHoursLaterWeatherIcon}@2x.png`;
            const sixHoursLaterTemp = weatherData.hourly[6].temp;
            const sixHoursLaterDescription =
              weatherData.hourly[6].weather[0].description;
            const sixHoursLaterWeatherIcon =
              weatherData.hourly[6].weather[0].icon;
            const sixHoursLaterImageURL = `http://openweathermap.org/img/wn/${sixHoursLaterWeatherIcon}@2x.png`;
            const sevenHoursLaterTemp = weatherData.hourly[7].temp;
            const sevenHoursLaterDescription =
              weatherData.hourly[7].weather[0].description;
            const sevenHoursLaterWeatherIcon =
              weatherData.hourly[7].weather[0].icon;
            const sevenHoursLaterImageURL = `http://openweathermap.org/img/wn/${sevenHoursLaterWeatherIcon}@2x.png`;
            const eightHoursLaterTemp = weatherData.hourly[8].temp;
            const eightHoursLaterDescription =
              weatherData.hourly[8].weather[0].description;
            const eightHoursLaterWeatherIcon =
              weatherData.hourly[8].weather[0].icon;
            const eightHoursLaterImageURL = `http://openweathermap.org/img/wn/${eightHoursLaterWeatherIcon}@2x.png`;
            const nineHoursLaterTemp = weatherData.hourly[9].temp;
            const nineHoursLaterDescription =
              weatherData.hourly[9].weather[0].description;
            const nineHoursLaterWeatherIcon =
              weatherData.hourly[9].weather[0].icon;
            const nineHoursLaterImageURL = `http://openweathermap.org/img/wn/${nineHoursLaterWeatherIcon}@2x.png`;
            const tenHoursLaterTemp = weatherData.hourly[10].temp;
            const tenHoursLaterDescription =
              weatherData.hourly[10].weather[0].description;
            const tenHoursLaterWeatherIcon =
              weatherData.hourly[10].weather[0].icon;
            const tenHoursLaterImageURL = `http://openweathermap.org/img/wn/${tenHoursLaterWeatherIcon}@2x.png`;
            const elevenHoursLaterTemp = weatherData.hourly[11].temp;
            const elevenHoursLaterDescription =
              weatherData.hourly[11].weather[0].description;
            const elevenHoursLaterWeatherIcon =
              weatherData.hourly[11].weather[0].icon;
            const elevenHoursLaterImageURL = `http://openweathermap.org/img/wn/${elevenHoursLaterWeatherIcon}@2x.png`;
            const twelveHoursLaterTemp = weatherData.hourly[12].temp;
            const twelveHoursLaterDescription =
              weatherData.hourly[12].weather[0].description;
            const twelveHoursLaterWeatherIcon =
              weatherData.hourly[12].weather[0].icon;
            const twelveHoursLaterImageURL = `http://openweathermap.org/img/wn/${twelveHoursLaterWeatherIcon}@2x.png`;
            const thirteenHoursLaterTemp = weatherData.hourly[13].temp;
            const thirteenHoursLaterDescription =
              weatherData.hourly[13].weather[0].description;
            const thirteenHoursLaterWeatherIcon =
              weatherData.hourly[13].weather[0].icon;
            const thirteenHoursLaterImageURL = `http://openweathermap.org/img/wn/${thirteenHoursLaterWeatherIcon}@2x.png`;
            const fourteenHoursLaterTemp = weatherData.hourly[14].temp;
            const fourteenHoursLaterDescription =
              weatherData.hourly[14].weather[0].description;
            const fourteenHoursLaterWeatherIcon =
              weatherData.hourly[14].weather[0].icon;
            const fourteenHoursLaterImageURL = `http://openweathermap.org/img/wn/${fourteenHoursLaterWeatherIcon}@2x.png`;
            const fifteenHoursLaterTemp = weatherData.hourly[15].temp;
            const fifteenHoursLaterDescription =
              weatherData.hourly[15].weather[0].description;
            const fifteenHoursLaterWeatherIcon =
              weatherData.hourly[15].weather[0].icon;
            const fifteenHoursLaterImageURL = `http://openweathermap.org/img/wn/${fifteenHoursLaterWeatherIcon}@2x.png`;
            const sixteenHoursLaterTemp = weatherData.hourly[16].temp;
            const sixteenHoursLaterDescription =
              weatherData.hourly[16].weather[0].description;
            const sixteenHoursLaterWeatherIcon =
              weatherData.hourly[16].weather[0].icon;
            const sixteenHoursLaterImageURL = `http://openweathermap.org/img/wn/${sixteenHoursLaterWeatherIcon}@2x.png`;
            const seventeenHoursLaterTemp = weatherData.hourly[17].temp;
            const seventeenHoursLaterDescription =
              weatherData.hourly[17].weather[0].description;
            const seventeenHoursLaterWeatherIcon =
              weatherData.hourly[17].weather[0].icon;
            const seventeenHoursLaterImageURL = `http://openweathermap.org/img/wn/${seventeenHoursLaterWeatherIcon}@2x.png`;
            const eighteenHoursLaterTemp = weatherData.hourly[18].temp;
            const eighteenHoursLaterDescription =
              weatherData.hourly[18].weather[0].description;
            const eighteenHoursLaterWeatherIcon =
              weatherData.hourly[18].weather[0].icon;
            const eighteenHoursLaterImageURL = `http://openweathermap.org/img/wn/${eighteenHoursLaterWeatherIcon}@2x.png`;
            const nineteenHoursLaterTemp = weatherData.hourly[19].temp;
            const nineteenHoursLaterDescription =
              weatherData.hourly[19].weather[0].description;
            const nineteenHoursLaterWeatherIcon =
              weatherData.hourly[19].weather[0].icon;
            const nineteenHoursLaterImageURL = `http://openweathermap.org/img/wn/${nineteenHoursLaterWeatherIcon}@2x.png`;
            const twentyHoursLaterTemp = weatherData.hourly[20].temp;
            const twentyHoursLaterDescription =
              weatherData.hourly[20].weather[0].description;
            const twentyHoursLaterWeatherIcon =
              weatherData.hourly[20].weather[0].icon;
            const twentyHoursLaterImageURL = `http://openweathermap.org/img/wn/${twentyHoursLaterWeatherIcon}@2x.png`;
            const twentyOneHoursLaterTemp = weatherData.hourly[21].temp;
            const twentyOneHoursLaterDescription =
              weatherData.hourly[21].weather[0].description;
            const twentyOneHoursLaterWeatherIcon =
              weatherData.hourly[21].weather[0].icon;
            const twentyOneHoursLaterImageURL = `http://openweathermap.org/img/wn/${twentyOneHoursLaterWeatherIcon}@2x.png`;
            const twentyTwoHoursLaterTemp = weatherData.hourly[22].temp;
            const twentyTwoHoursLaterDescription =
              weatherData.hourly[22].weather[0].description;
            const twentyTwoHoursLaterWeatherIcon =
              weatherData.hourly[22].weather[0].icon;
            const twentyTwoHoursLaterImageURL = `http://openweathermap.org/img/wn/${twentyTwoHoursLaterWeatherIcon}@2x.png`;
            const twentyThreeHoursLaterTemp = weatherData.hourly[23].temp;
            const twentyThreeHoursLaterDescription =
              weatherData.hourly[23].weather[0].description;
            const twentyThreeHoursLaterWeatherIcon =
              weatherData.hourly[23].weather[0].icon;
            const twentyThreeHoursLaterImageURL = `http://openweathermap.org/img/wn/${twentyThreeHoursLaterWeatherIcon}@2x.png`;
            const twentyFourHoursLaterTemp = weatherData.hourly[24].temp;
            const twentyFourHoursLaterDescription =
              weatherData.hourly[24].weather[0].description;
            const twentyFourHoursLaterWeatherIcon =
              weatherData.hourly[24].weather[0].icon;
            const twentyFourHoursLaterImageURL = `http://openweathermap.org/img/wn/${twentyFourHoursLaterWeatherIcon}@2x.png`;

            let hours = currentDate.getHours();
            const ampm = hours >= 12 ? "pm" : "am";
            hours = hours % 12;
            hours = hours ? hours : 12;

            const setOneHourLater = new Date();
            setOneHourLater.setHours(setOneHourLater.getHours() + 1);
            let getOneHourLater = setOneHourLater.getHours();
            const ampmOne = getOneHourLater >= 12 ? "pm" : "am";
            getOneHourLater = getOneHourLater % 12;
            getOneHourLater = getOneHourLater ? getOneHourLater : 12;

            const setTwoHoursLater = new Date();
            setTwoHoursLater.setHours(setTwoHoursLater.getHours() + 2);
            let getTwoHoursLater = setTwoHoursLater.getHours();
            const ampmTwo = getTwoHoursLater >= 12 ? "pm" : "am";
            getTwoHoursLater = getTwoHoursLater % 12;
            getTwoHoursLater = getTwoHoursLater ? getTwoHoursLater : 12;

            const setThreeHoursLater = new Date();
            setThreeHoursLater.setHours(setThreeHoursLater.getHours() + 3);
            let getThreeHoursLater = setThreeHoursLater.getHours();
            const ampmThree = getThreeHoursLater >= 12 ? "pm" : "am";
            getThreeHoursLater = getThreeHoursLater % 12;
            getThreeHoursLater = getThreeHoursLater ? getThreeHoursLater : 12;

            const setFourHoursLater = new Date();
            setFourHoursLater.setHours(setFourHoursLater.getHours() + 4);
            let getFourHoursLater = setFourHoursLater.getHours();
            const ampmFour = getFourHoursLater >= 12 ? "pm" : "am";
            getFourHoursLater = getFourHoursLater % 12;
            getFourHoursLater = getFourHoursLater ? getFourHoursLater : 12;

            const setFiveHoursLater = new Date();
            setFiveHoursLater.setHours(setFiveHoursLater.getHours() + 5);
            let getFiveHoursLater = setFiveHoursLater.getHours();
            const ampmFive = getFiveHoursLater >= 12 ? "pm" : "am";
            getFiveHoursLater = getFiveHoursLater % 12;
            getFiveHoursLater = getFiveHoursLater ? getFiveHoursLater : 12;

            const setSixHoursLater = new Date();
            setSixHoursLater.setHours(setSixHoursLater.getHours() + 6);
            let getSixHoursLater = setSixHoursLater.getHours();
            const ampmSix = getSixHoursLater >= 12 ? "pm" : "am";
            getSixHoursLater = getSixHoursLater % 12;
            getSixHoursLater = getSixHoursLater ? getSixHoursLater : 12;

            const setSevenHoursLater = new Date();
            setSevenHoursLater.setHours(setSevenHoursLater.getHours() + 7);
            let getSevenHoursLater = setSevenHoursLater.getHours();
            const ampmSeven = getSevenHoursLater >= 12 ? "pm" : "am";
            getSevenHoursLater = getSevenHoursLater % 12;
            getSevenHoursLater = getSevenHoursLater ? getSevenHoursLater : 12;

            const setEightHoursLater = new Date();
            setEightHoursLater.setHours(setEightHoursLater.getHours() + 8);
            let getEightHoursLater = setEightHoursLater.getHours();
            const ampmEight = getEightHoursLater >= 12 ? "pm" : "am";
            getEightHoursLater = getEightHoursLater % 12;
            getEightHoursLater = getEightHoursLater ? getEightHoursLater : 12;

            const setNineHoursLater = new Date();
            setNineHoursLater.setHours(setNineHoursLater.getHours() + 9);
            let getNineHoursLater = setNineHoursLater.getHours();
            const ampmNine = getNineHoursLater >= 12 ? "pm" : "am";
            getNineHoursLater = getNineHoursLater % 12;
            getNineHoursLater = getNineHoursLater ? getNineHoursLater : 12;

            const setTenHoursLater = new Date();
            setTenHoursLater.setHours(setTenHoursLater.getHours() + 10);
            let getTenHoursLater = setTenHoursLater.getHours();
            const ampmTen = getTenHoursLater >= 12 ? "pm" : "am";
            getTenHoursLater = getTenHoursLater % 12;
            getTenHoursLater = getTenHoursLater ? getTenHoursLater : 12;

            const setElevenHoursLater = new Date();
            setElevenHoursLater.setHours(setElevenHoursLater.getHours() + 11);
            let getElevenHoursLater = setElevenHoursLater.getHours();
            const ampmEleven = getElevenHoursLater >= 12 ? "pm" : "am";
            getElevenHoursLater = getElevenHoursLater % 12;
            getElevenHoursLater = getElevenHoursLater
              ? getElevenHoursLater
              : 12;

            const setTwelveHoursLater = new Date();
            setTwelveHoursLater.setHours(setTwelveHoursLater.getHours() + 12);
            let getTwelveHoursLater = setTwelveHoursLater.getHours();
            const ampmTwelve = getTwelveHoursLater >= 12 ? "pm" : "am";
            getTwelveHoursLater = getTwelveHoursLater % 12;
            getTwelveHoursLater = getTwelveHoursLater
              ? getTwelveHoursLater
              : 12;

            const setThirteenHoursLater = new Date();
            setThirteenHoursLater.setHours(
              setThirteenHoursLater.getHours() + 13
            );
            let getThirteenHoursLater = setThirteenHoursLater.getHours();
            const ampmThirteen = getThirteenHoursLater >= 12 ? "pm" : "am";
            getThirteenHoursLater = getThirteenHoursLater % 12;
            getThirteenHoursLater = getThirteenHoursLater
              ? getThirteenHoursLater
              : 12;

            const setFourteenHoursLater = new Date();
            setFourteenHoursLater.setHours(
              setFourteenHoursLater.getHours() + 14
            );
            let getFourteenHoursLater = setFourteenHoursLater.getHours();
            const ampmFourteen = getFourteenHoursLater >= 12 ? "pm" : "am";
            getFourteenHoursLater = getFourteenHoursLater % 12;
            getFourteenHoursLater = getFourteenHoursLater
              ? getFourteenHoursLater
              : 12;

            const setFifteenHoursLater = new Date();
            setFifteenHoursLater.setHours(setFifteenHoursLater.getHours() + 15);
            let getFifteenHoursLater = setFifteenHoursLater.getHours();
            const ampmFifteen = getFifteenHoursLater >= 12 ? "pm" : "am";
            getFifteenHoursLater = getFifteenHoursLater % 12;
            getFifteenHoursLater = getFifteenHoursLater
              ? getFifteenHoursLater
              : 12;

            const setSixteenHoursLater = new Date();
            setSixteenHoursLater.setHours(setSixteenHoursLater.getHours() + 16);
            let getSixteenHoursLater = setSixteenHoursLater.getHours();
            const ampmSixteen = getSixteenHoursLater >= 12 ? "pm" : "am";
            getSixteenHoursLater = getSixteenHoursLater % 12;
            getSixteenHoursLater = getSixteenHoursLater
              ? getSixteenHoursLater
              : 12;

            const setSeventeenHoursLater = new Date();
            setSeventeenHoursLater.setHours(
              setSeventeenHoursLater.getHours() + 17
            );
            let getSeventeenHoursLater = setSeventeenHoursLater.getHours();
            const ampmSeventeen = getSeventeenHoursLater >= 12 ? "pm" : "am";
            getSeventeenHoursLater = getSeventeenHoursLater % 12;
            getSeventeenHoursLater = getSeventeenHoursLater
              ? getSeventeenHoursLater
              : 12;

            const setEighteenHoursLater = new Date();
            setEighteenHoursLater.setHours(
              setEighteenHoursLater.getHours() + 18
            );
            let getEighteenHoursLater = setEighteenHoursLater.getHours();
            const ampmEighteen = getEighteenHoursLater >= 12 ? "pm" : "am";
            getEighteenHoursLater = getEighteenHoursLater % 12;
            getEighteenHoursLater = getEighteenHoursLater
              ? getEighteenHoursLater
              : 12;

            const setNineteenHoursLater = new Date();
            setNineteenHoursLater.setHours(
              setNineteenHoursLater.getHours() + 19
            );
            let getNineteenHoursLater = setNineteenHoursLater.getHours();
            const ampmNineteen = getNineteenHoursLater >= 12 ? "pm" : "am";
            getNineteenHoursLater = getNineteenHoursLater % 12;
            getNineteenHoursLater = getNineteenHoursLater
              ? getNineteenHoursLater
              : 12;

            const setTwentyHoursLater = new Date();
            setTwentyHoursLater.setHours(setTwentyHoursLater.getHours() + 20);
            let getTwentyHoursLater = setTwentyHoursLater.getHours();
            const ampmTwenty = getTwentyHoursLater >= 12 ? "pm" : "am";
            getTwentyHoursLater = getTwentyHoursLater % 12;
            getTwentyHoursLater = getTwentyHoursLater
              ? getTwentyHoursLater
              : 12;

            const setTwentyOneHoursLater = new Date();
            setTwentyOneHoursLater.setHours(
              setTwentyOneHoursLater.getHours() + 21
            );
            let getTwentyOneHoursLater = setTwentyOneHoursLater.getHours();
            const ampmTwentyOne = getTwentyOneHoursLater >= 12 ? "pm" : "am";
            getTwentyOneHoursLater = getTwentyOneHoursLater % 12;
            getTwentyOneHoursLater = getTwentyOneHoursLater
              ? getTwentyOneHoursLater
              : 12;

            const setTwentyTwoHoursLater = new Date();
            setTwentyTwoHoursLater.setHours(
              setTwentyTwoHoursLater.getHours() + 22
            );
            let getTwentyTwoHoursLater = setTwentyTwoHoursLater.getHours();
            const ampmTwentyTwo = getTwentyTwoHoursLater >= 12 ? "pm" : "am";
            getTwentyTwoHoursLater = getTwentyTwoHoursLater % 12;
            getTwentyTwoHoursLater = getTwentyTwoHoursLater
              ? getTwentyTwoHoursLater
              : 12;

            const setTwentyThreeHoursLater = new Date();
            setTwentyThreeHoursLater.setHours(
              setTwentyThreeHoursLater.getHours() + 23
            );
            let getTwentyThreeHoursLater = setTwentyThreeHoursLater.getHours();
            const ampmTwentyThree =
              getTwentyThreeHoursLater >= 12 ? "pm" : "am";
            getTwentyThreeHoursLater = getTwentyThreeHoursLater % 12;
            getTwentyThreeHoursLater = getTwentyThreeHoursLater
              ? getTwentyThreeHoursLater
              : 12;

            const setTwentyFourHoursLater = new Date();
            setTwentyFourHoursLater.setHours(
              setTwentyFourHoursLater.getHours() + 24
            );
            let getTwentyFourHoursLater = setTwentyFourHoursLater.getHours();
            const ampmTwentyFour = getTwentyFourHoursLater >= 12 ? "pm" : "am";
            getTwentyFourHoursLater = getTwentyFourHoursLater % 12;
            getTwentyFourHoursLater = getTwentyFourHoursLater
              ? getTwentyFourHoursLater
              : 12;

            // am/pm
            const currentHour = `${hours}:00${ampm}`;
            const oneHourLater = `${getOneHourLater}:00${ampmOne}`;
            const twoHoursLater = `${getTwoHoursLater}:00${ampmTwo}`;
            const threeHoursLater = `${getThreeHoursLater}:00${ampmThree}`;
            const fourHoursLater = `${getFourHoursLater}:00${ampmFour}`;
            const fiveHoursLater = `${getFiveHoursLater}:00${ampmFive}`;
            const sixHoursLater = `${getSixHoursLater}:00${ampmSix}`;
            const sevenHoursLater = `${getSevenHoursLater}:00${ampmSeven}`;
            const eightHoursLater = `${getEightHoursLater}:00${ampmEight}`;
            const nineHoursLater = `${getNineHoursLater}:00${ampmNine}`;
            const tenHoursLater = `${getTenHoursLater}:00${ampmTen}`;
            const elevenHoursLater = `${getElevenHoursLater}:00${ampmEleven}`;
            const twelveHoursLater = `${getTwelveHoursLater}:00${ampmTwelve}`;
            const thirteenHoursLater = `${getThirteenHoursLater}:00${ampmThirteen}`;
            const fourteenHoursLater = `${getFourteenHoursLater}:00${ampmFourteen}`;
            const fifteenHoursLater = `${getFifteenHoursLater}:00${ampmFifteen}`;
            const sixteenHoursLater = `${getSixteenHoursLater}:00${ampmSixteen}`;
            const seventeenHoursLater = `${getSeventeenHoursLater}:00${ampmSeventeen}`;
            const eighteenHoursLater = `${getEighteenHoursLater}:00${ampmEighteen}`;
            const nineteenHoursLater = `${getNineteenHoursLater}:00${ampmNineteen}`;
            const twentyHoursLater = `${getTwentyHoursLater}:00${ampmTwenty}`;
            const twentyOneHoursLater = `${getTwentyOneHoursLater}:00${ampmTwentyOne}`;
            const twentyTwoHoursLater = `${getTwentyTwoHoursLater}:00${ampmTwentyTwo}`;
            const twentyThreeHoursLater = `${getTwentyThreeHoursLater}:00${ampmTwentyThree}`;
            const twentyFourHoursLater = `${getTwentyFourHoursLater}:00${ampmTwentyFour}`;

            // 24hours
            // const currentHour = `${hours}:00`;
            // const oneHourLater = `${getOneHourLater}:00`;
            // const twoHoursLater = `${getTwoHoursLater}:00`;
            // const threeHoursLater = `${getThreeHoursLater}:00`;
            // const fourHoursLater = `${getFourHoursLater}:00`;
            // const fiveHoursLater = `${getFiveHoursLater}:00`;
            // const sixHoursLater = `${getSixHoursLater}:00`;
            // const sevenHoursLater = `${getSevenHoursLater}:00`;
            // const eightHoursLater = `${getEightHoursLater}:00`;
            // const nineHoursLater = `${getNineHoursLater}:00`;
            // const tenHoursLater = `${getTenHoursLater}:00`;
            // const elevenHoursLater = `${getElevenHoursLater}:00`;
            // const twelveHoursLater = `${getTwelveHoursLater}:00`;
            // const thirteenHoursLater = `${getThirteenHoursLater}:00`;
            // const fourteenHoursLater = `${getFourteenHoursLater}:00`;
            // const fifteenHoursLater = `${getFifteenHoursLater}:00`;
            // const sixteenHoursLater = `${getSixteenHoursLater}:00`;
            // const seventeenHoursLater = `${getSeventeenHoursLater}:00`;
            // const eighteenHoursLater = `${getEighteenHoursLater}:00`;
            // const nineteenHoursLater = `${getNineteenHoursLater}:00`;
            // const twentyHoursLater = `${getTwentyHoursLater}:00`;
            // const twentyOneHoursLater = `${getTwentyOneHoursLater}:00`;
            // const twentyTwoHoursLater = `${getTwentyTwoHoursLater}:00`;
            // const twentyThreeHoursLater = `${getTwentyThreeHoursLater}:00`;
            // const twentyFourHoursLater = `${getTwentyFourHoursLater}:00`;

            res.write(
              `
              <h1 style="font-family:Arial, Helvetica,sans-serif;text-align: center;margin: 4rem 0 0 0;color:#B91646;">
                Hourly
              </h1>
              <hr style="border: 1px dotted gray;width:600px">
              <div>
                <div style="display: flex;align-item: center;justify-content: center">
                  <h3 style="color:blue;font-family:Arial, Helvetica,sans-serif;padding: 0 1rem 0 0;margin: 5px 0 5px 0">${currentHour} </h3>
                  <img style="width:40px;" src=${currentImageURL}>
                  <h3 style="color:gray;font-family:Arial, Helvetica,sans-serif;text-align:center;margin: 5px 0 5px 0">
                  ${currentTemp} &#8451;
                  </h3>
                  <h3 style="color:darkblue;font-family:Arial, Helvetica,sans-serif;text-align:center;padding: 0 0 0 2rem;margin: 5px 0 5px 0">${currentDescription}</h3>
                </div>
                <div style="display: flex;align-item: center;justify-content: center">
                  <h3 style="color:blue;font-family:Arial, Helvetica,sans-serif;padding: 0 1rem 0 0;margin: 5px 0 5px 0">${oneHourLater} </h3>
                  <img style="width:40px;" src=${oneHourLaterImageURL}>
                  <h3 style="color:gray;font-family:Arial, Helvetica,sans-serif;text-align:center;margin: 5px 0 5px 0">
                  ${oneHourLaterTemp} &#8451;
                  </h3>
                  <h3 style="color:darkblue;font-family:Arial, Helvetica,sans-serif;text-align:center;padding: 0 0 0 2rem;margin: 5px 0 5px 0">${oneHourLaterDescription}</h3>
                </div>
                <div style="display: flex;align-item: center;justify-content: center">
                  <h3 style="color:blue;font-family:Arial, Helvetica,sans-serif;padding: 0 1rem 0 0;margin: 5px 0 5px 0">${twoHoursLater}</h3>
                  <img style="width:40px;" src=${twoHoursLaterImageURL}>
                  <h3 style="color:gray;font-family:Arial, Helvetica,sans-serif;text-align:center;margin: 5px 0 5px 0">
                  ${twoHoursLaterTemp} &#8451;
                  </h3>
                  <h3 style="color:darkblue;font-family:Arial, Helvetica,sans-serif;text-align:center;padding: 0 0 0 2rem;margin: 5px 0 5px 0">${twoHoursLaterDescription}</h3>
                </div>
                <div style="display: flex;align-item: center;justify-content: center">
                  <h3 style="color:blue;font-family:Arial, Helvetica,sans-serif;padding: 0 1rem 0 0;margin: 5px 0 5px 0">${threeHoursLater}</h3>
                  <img style="width:40px;" src=${threeHoursLaterImageURL}>
                  <h3 style="color:gray;font-family:Arial, Helvetica,sans-serif;text-align:center;margin: 5px 0 5px 0">
                  ${threeHoursLaterTemp} &#8451;
                  </h3>
                  <h3 style="color:darkblue;font-family:Arial, Helvetica,sans-serif;text-align:center;padding: 0 0 0 2rem;margin: 5px 0 5px 0">${threeHoursLaterDescription}</h3>
                </div>
                <div style="display: flex;align-item: center;justify-content: center">
                  <h3 style="color:blue;font-family:Arial, Helvetica,sans-serif;padding: 0 1rem 0 0;margin: 5px 0 5px 0">${fourHoursLater}</h3>
                  <img style="width:40px;" src=${fourHoursLaterImageURL}>
                  <h3 style="color:gray;font-family:Arial, Helvetica,sans-serif;text-align:center;margin: 5px 0 5px 0">
                  ${fourHoursLaterTemp} &#8451;
                  </h3>
                  <h3 style="color:darkblue;font-family:Arial, Helvetica,sans-serif;text-align:center;padding: 0 0 0 2rem;margin: 5px 0 5px 0">${fourHoursLaterDescription}</h3>
                </div>
                <div style="display: flex;align-item: center;justify-content: center">
                  <h3 style="color:blue;font-family:Arial, Helvetica,sans-serif;padding: 0 1rem 0 0;margin: 5px 0 5px 0">${fiveHoursLater}</h3>
                  <img style="width:40px;" src=${fiveHoursLaterImageURL}>
                  <h3 style="color:gray;font-family:Arial, Helvetica,sans-serif;text-align:center;margin: 5px 0 5px 0">
                  ${fiveHoursLaterTemp} &#8451;
                  </h3>
                  <h3 style="color:darkblue;font-family:Arial, Helvetica,sans-serif;text-align:center;padding: 0 0 0 2rem;margin: 5px 0 5px 0">${fiveHoursLaterDescription}</h3>
                </div>
                <div style="display: flex;align-item: center;justify-content: center">
                  <h3 style="color:blue;font-family:Arial, Helvetica,sans-serif;padding: 0 1rem 0 0;margin: 5px 0 5px 0">${sixHoursLater}</h3>
                  <img style="width:40px;" src=${sixHoursLaterImageURL}>
                  <h3 style="color:gray;font-family:Arial, Helvetica,sans-serif;text-align:center;margin: 5px 0 5px 0">
                  ${sixHoursLaterTemp} &#8451;
                  </h3>
                  <h3 style="color:darkblue;font-family:Arial, Helvetica,sans-serif;text-align:center;padding: 0 0 0 2rem;margin: 5px 0 5px 0">${sixHoursLaterDescription}</h3>
                </div>
                <div style="display: flex;align-item: center;justify-content: center">
                  <h3 style="color:blue;font-family:Arial, Helvetica,sans-serif;padding: 0 1rem 0 0;margin: 5px 0 5px 0">${sevenHoursLater}</h3>
                  <img style="width:40px;" src=${sevenHoursLaterImageURL}>
                  <h3 style="color:gray;font-family:Arial, Helvetica,sans-serif;text-align:center;margin: 5px 0 5px 0">
                  ${sevenHoursLaterTemp} &#8451;
                  </h3>
                  <h3 style="color:darkblue;font-family:Arial, Helvetica,sans-serif;text-align:center;padding: 0 0 0 2rem;margin: 5px 0 5px 0">${sevenHoursLaterDescription}</h3>
                </div>
                <div style="display: flex;align-item: center;justify-content: center">
                  <h3 style="color:blue;font-family:Arial, Helvetica,sans-serif;padding: 0 1rem 0 0;margin: 5px 0 5px 0">${eightHoursLater}</h3>
                  <img style="width:40px;" src=${eightHoursLaterImageURL}>
                  <h3 style="color:gray;font-family:Arial, Helvetica,sans-serif;text-align:center;margin: 5px 0 5px 0">
                  ${eightHoursLaterTemp} &#8451;
                  </h3>
                  <h3 style="color:darkblue;font-family:Arial, Helvetica,sans-serif;text-align:center;padding: 0 0 0 2rem;margin: 5px 0 5px 0">${eightHoursLaterDescription}</h3>
                </div>
                <div style="display: flex;align-item: center;justify-content: center">
                  <h3 style="color:blue;font-family:Arial, Helvetica,sans-serif;padding: 0 1rem 0 0;margin: 5px 0 5px 0">${nineHoursLater}</h3>
                  <img style="width:40px;" src=${nineHoursLaterImageURL}>
                  <h3 style="color:gray;font-family:Arial, Helvetica,sans-serif;text-align:center;margin: 5px 0 5px 0">
                  ${nineHoursLaterTemp} &#8451;
                  </h3>
                  <h3 style="color:darkblue;font-family:Arial, Helvetica,sans-serif;text-align:center;padding: 0 0 0 2rem;margin: 5px 0 5px 0">${nineHoursLaterDescription}</h3>
                </div>
                <div style="display: flex;align-item: center;justify-content: center">
                  <h3 style="color:blue;font-family:Arial, Helvetica,sans-serif;padding: 0 1rem 0 0;margin: 5px 0 5px 0">${tenHoursLater}</h3>
                  <img style="width:40px;" src=${tenHoursLaterImageURL}>
                  <h3 style="color:gray;font-family:Arial, Helvetica,sans-serif;text-align:center;margin: 5px 0 5px 0">
                  ${tenHoursLaterTemp} &#8451;
                  </h3>
                  <h3 style="color:darkblue;font-family:Arial, Helvetica,sans-serif;text-align:center;padding: 0 0 0 2rem;margin: 5px 0 5px 0">${tenHoursLaterDescription}</h3>
                </div>
                <div style="display: flex;align-item: center;justify-content: center">
                  <h3 style="color:blue;font-family:Arial, Helvetica,sans-serif;padding: 0 1rem 0 0;margin: 5px 0 5px 0">${elevenHoursLater}</h3>
                  <img style="width:40px;" src=${elevenHoursLaterImageURL}>
                  <h3 style="color:gray;font-family:Arial, Helvetica,sans-serif;text-align:center;margin: 5px 0 5px 0">
                  ${elevenHoursLaterTemp} &#8451;
                  </h3>
                  <h3 style="color:darkblue;font-family:Arial, Helvetica,sans-serif;text-align:center;padding: 0 0 0 2rem;margin: 5px 0 5px 0">${elevenHoursLaterDescription}</h3>
                </div>
                <div style="display: flex;align-item: center;justify-content: center">
                  <h3 style="color:blue;font-family:Arial, Helvetica,sans-serif;padding: 0 1rem 0 0;margin: 5px 0 5px 0">${twelveHoursLater}</h3>
                  <img style="width:40px;" src=${twelveHoursLaterImageURL}>
                  <h3 style="color:gray;font-family:Arial, Helvetica,sans-serif;text-align:center;margin: 5px 0 5px 0">
                  ${twelveHoursLaterTemp} &#8451;
                  </h3>
                  <h3 style="color:darkblue;font-family:Arial, Helvetica,sans-serif;text-align:center;padding: 0 0 0 2rem;margin: 5px 0 5px 0">${twelveHoursLaterDescription}</h3>
                </div>
                <div style="display: flex;align-item: center;justify-content: center">
                  <h3 style="color:blue;font-family:Arial, Helvetica,sans-serif;padding: 0 1rem 0 0;margin: 5px 0 5px 0">${thirteenHoursLater}</h3>
                  <img style="width:40px;" src=${thirteenHoursLaterImageURL}>
                  <h3 style="color:gray;font-family:Arial, Helvetica,sans-serif;text-align:center;margin: 5px 0 5px 0">
                  ${thirteenHoursLaterTemp} &#8451;
                  </h3>
                  <h3 style="color:darkblue;font-family:Arial, Helvetica,sans-serif;text-align:center;padding: 0 0 0 2rem;margin: 5px 0 5px 0">${thirteenHoursLaterDescription}</h3>
                </div>
                <div style="display: flex;align-item: center;justify-content: center">
                  <h3 style="color:blue;font-family:Arial, Helvetica,sans-serif;padding: 0 1rem 0 0;margin: 5px 0 5px 0">${fourteenHoursLater}</h3>
                  <img style="width:40px;" src=${fourteenHoursLaterImageURL}>
                  <h3 style="color:gray;font-family:Arial, Helvetica,sans-serif;text-align:center;margin: 5px 0 5px 0">
                  ${fourteenHoursLaterTemp} &#8451;
                  </h3>
                  <h3 style="color:darkblue;font-family:Arial, Helvetica,sans-serif;text-align:center;padding: 0 0 0 2rem;margin: 5px 0 5px 0">${fourteenHoursLaterDescription}</h3>
                </div>
                <div style="display: flex;align-item: center;justify-content: center">
                  <h3 style="color:blue;font-family:Arial, Helvetica,sans-serif;padding: 0 1rem 0 0;margin: 5px 0 5px 0">${fifteenHoursLater}</h3>
                  <img style="width:40px;" src=${fifteenHoursLaterImageURL}>
                  <h3 style="color:gray;font-family:Arial, Helvetica,sans-serif;text-align:center;margin: 5px 0 5px 0">
                  ${fifteenHoursLaterTemp} &#8451;
                  </h3>
                  <h3 style="color:darkblue;font-family:Arial, Helvetica,sans-serif;text-align:center;padding: 0 0 0 2rem;margin: 5px 0 5px 0">${fifteenHoursLaterDescription}</h3>
                </div>
                <div style="display: flex;align-item: center;justify-content: center">
                  <h3 style="color:blue;font-family:Arial, Helvetica,sans-serif;padding: 0 1rem 0 0;margin: 5px 0 5px 0">${sixteenHoursLater}</h3>
                  <img style="width:40px;" src=${sixteenHoursLaterImageURL}>
                  <h3 style="color:gray;font-family:Arial, Helvetica,sans-serif;text-align:center;margin: 5px 0 5px 0">
                  ${sixteenHoursLaterTemp} &#8451;
                  </h3>
                  <h3 style="color:darkblue;font-family:Arial, Helvetica,sans-serif;text-align:center;padding: 0 0 0 2rem;margin: 5px 0 5px 0">${sixteenHoursLaterDescription}</h3>
                </div>
                <div style="display: flex;align-item: center;justify-content: center">
                  <h3 style="color:blue;font-family:Arial, Helvetica,sans-serif;padding: 0 1rem 0 0;margin: 5px 0 5px 0">${seventeenHoursLater}</h3>
                  <img style="width:40px;" src=${seventeenHoursLaterImageURL}>
                  <h3 style="color:gray;font-family:Arial, Helvetica,sans-serif;text-align:center;margin: 5px 0 5px 0">
                  ${seventeenHoursLaterTemp} &#8451;
                  </h3>
                  <h3 style="color:darkblue;font-family:Arial, Helvetica,sans-serif;text-align:center;padding: 0 0 0 2rem;margin: 5px 0 5px 0">${seventeenHoursLaterDescription}</h3>
                </div>
                <div style="display: flex;align-item: center;justify-content: center">
                  <h3 style="color:blue;font-family:Arial, Helvetica,sans-serif;padding: 0 1rem 0 0;margin: 5px 0 5px 0">${eighteenHoursLater}</h3>
                  <img style="width:40px;" src=${eighteenHoursLaterImageURL}>
                  <h3 style="color:gray;font-family:Arial, Helvetica,sans-serif;text-align:center;margin: 5px 0 5px 0">
                  ${eighteenHoursLaterTemp} &#8451;
                  </h3>
                  <h3 style="color:darkblue;font-family:Arial, Helvetica,sans-serif;text-align:center;padding: 0 0 0 2rem;margin: 5px 0 5px 0">${eighteenHoursLaterDescription}</h3>
                </div>
                <div style="display: flex;align-item: center;justify-content: center">
                  <h3 style="color:blue;font-family:Arial, Helvetica,sans-serif;padding: 0 1rem 0 0;margin: 5px 0 5px 0">${nineteenHoursLater}</h3>
                  <img style="width:40px;" src=${nineteenHoursLaterImageURL}>
                  <h3 style="color:gray;font-family:Arial, Helvetica,sans-serif;text-align:center;margin: 5px 0 5px 0">
                  ${nineteenHoursLaterTemp} &#8451;
                  </h3>
                  <h3 style="color:darkblue;font-family:Arial, Helvetica,sans-serif;text-align:center;padding: 0 0 0 2rem;margin: 5px 0 5px 0">${nineteenHoursLaterDescription}</h3>
                </div>
                <div style="display: flex;align-item: center;justify-content: center">
                  <h3 style="color:blue;font-family:Arial, Helvetica,sans-serif;padding: 0 1rem 0 0;margin: 5px 0 5px 0">${twentyHoursLater}</h3>
                  <img style="width:40px;" src=${twentyHoursLaterImageURL}>
                  <h3 style="color:gray;font-family:Arial, Helvetica,sans-serif;text-align:center;margin: 5px 0 5px 0">
                  ${twentyHoursLaterTemp} &#8451;
                  </h3>
                  <h3 style="color:darkblue;font-family:Arial, Helvetica,sans-serif;text-align:center;padding: 0 0 0 2rem;margin: 5px 0 5px 0">${twentyHoursLaterDescription}</h3>
                </div>
                <div style="display: flex;align-item: center;justify-content: center">
                  <h3 style="color:blue;font-family:Arial, Helvetica,sans-serif;padding: 0 1rem 0 0;margin: 5px 0 5px 0">${twentyOneHoursLater}</h3>
                  <img style="width:40px;" src=${twentyOneHoursLaterImageURL}>
                  <h3 style="color:gray;font-family:Arial, Helvetica,sans-serif;text-align:center;margin: 5px 0 5px 0">
                  ${twentyOneHoursLaterTemp} &#8451;
                  </h3>
                  <h3 style="color:darkblue;font-family:Arial, Helvetica,sans-serif;text-align:center;padding: 0 0 0 2rem;margin: 5px 0 5px 0">${twentyOneHoursLaterDescription}</h3>
                </div>
                <div style="display: flex;align-item: center;justify-content: center">
                  <h3 style="color:blue;font-family:Arial, Helvetica,sans-serif;padding: 0 1rem 0 0;margin: 5px 0 5px 0">${twentyTwoHoursLater}</h3>
                  <img style="width:40px;" src=${twentyTwoHoursLaterImageURL}>
                  <h3 style="color:gray;font-family:Arial, Helvetica,sans-serif;text-align:center;margin: 5px 0 5px 0">
                  ${twentyTwoHoursLaterTemp} &#8451;
                  </h3>
                  <h3 style="color:darkblue;font-family:Arial, Helvetica,sans-serif;text-align:center;padding: 0 0 0 2rem;margin: 5px 0 5px 0">${twentyTwoHoursLaterDescription}</h3>
                </div>
                <div style="display: flex;align-item: center;justify-content: center">
                  <h3 style="color:blue;font-family:Arial, Helvetica,sans-serif;padding: 0 1rem 0 0;margin: 5px 0 5px 0">${twentyThreeHoursLater}</h3>
                  <img style="width:40px;" src=${twentyThreeHoursLaterImageURL}>
                  <h3 style="color:gray;font-family:Arial, Helvetica,sans-serif;text-align:center;margin: 5px 0 5px 0">
                  ${twentyThreeHoursLaterTemp} &#8451;
                  </h3>
                  <h3 style="color:darkblue;font-family:Arial, Helvetica,sans-serif;text-align:center;padding: 0 0 0 2rem;margin: 5px 0 5px 0">${twentyThreeHoursLaterDescription}</h3>
                </div>
                <div style="display: flex;align-item: center;justify-content: center">
                  <h3 style="color:blue;font-family:Arial, Helvetica,sans-serif;padding: 0 1rem 0 0;margin: 5px 0 5px 0">${twentyFourHoursLater}</h3>
                  <img style="width:40px;" src=${twentyFourHoursLaterImageURL}>
                  <h3 style="color:gray;font-family:Arial, Helvetica,sans-serif;text-align:center;margin: 5px 0 5px 0">
                  ${twentyFourHoursLaterTemp} &#8451;
                  </h3>
                  <h3 style="color:darkblue;font-family:Arial, Helvetica,sans-serif;text-align:center;padding: 0 0 0 2rem;margin: 5px 0 5px 0">${twentyFourHoursLaterDescription}</h3>
                </div>
                <hr style="border: 1px dotted gray;width:600px;margin-bottom: 2rem;">
              </div>
            `
            );
            res.write(
              `
                <form onSubmit="{e => e.preventDefault}" onmouseover="" style="text-align: center;margin-bottom: 0 0 3rem 0">
                  <button type="submit"; name="button" style="font-size:1rem;background-color:#ECF87F;text-decoration:none;padding:10px 32px;border:none;cursor: pointer;">Home</button>
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
