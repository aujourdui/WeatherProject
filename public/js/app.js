import express from "express";
import alert from "alert";
import https from "https";
import { dirname } from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
dotenv.config();
var env = process.env;
var port = env.PORT;
if (port == null || port == "") {
    port = 3000;
}
var apiKey = env.API_KEY;
var __dirname = dirname(fileURLToPath(import.meta.url));
var app = express();
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/public/index.html");
});
app.post("/", function (req, res) {
    var originalQuery = req.body.cityName;
    var capitalizeFirstLetter = function (string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };
    var query = capitalizeFirstLetter(originalQuery);
    var unit = "metric";
    var url = "https://api.openweathermap.org/data/2.5/weather?q=".concat(query, "&appid=").concat(apiKey, "&units=").concat(unit);
    // current weather
    https.get(url, function (response) {
        response.on("data", function (data) {
            var weatherData = JSON.parse(data);
            var cityName = weatherData.name;
            if (query === cityName) {
                var changeCityName = cityName.toLowerCase().replace(" ", "");
                var country = weatherData.sys.country;
                var temp = weatherData.main.temp.toFixed(1);
                var maxTemp = weatherData.main.temp_max.toFixed(1);
                var minTemp = weatherData.main.temp_min.toFixed(1);
                var weatherDescription = weatherData.weather[0].description;
                var icon = weatherData.weather[0].icon;
                var imageURL = "http://openweathermap.org/img/wn/".concat(icon, "@2x.png");
                res.write("\n            <head>\n              <title>Weather App</title>\n              <link rel=\"stylesheet\" href=\"css/weather.css\" />\n              <link rel=\"icon\" type=\"image/jpg\" href=\"/images/w_logo.jpg\" />\n            </head>\n          ");
                res.write("\n            <div id=\"header\">\n              <h1 id=\"city-name\">\n              ".concat(cityName, " / ").concat(country, "\n              </h1>\n              <div id=\"header-link__wrapper\">\n                <div class=\"header-link__container\" id=\"header-link-container__left\">\n                  <a href=\"#current-link\"  class=\"header-link\">\n                    current\n                  </a>\n                </div>\n                <div class=\"header-link__container\">\n                  <a href=\"#daily-link\" class=\"header-link\">\n                    daily\n                  </a>\n                </div>\n                <div class=\"header-link__container\">\n                  <a href=\"#hourly-link\" class=\"header-link\">\n                    hourly\n                  </a>\n                </div>\n              </div>\n            </div>\n          "));
                res.write("\n            <a id=\"current-link\">\n            </a>\n            <div id=\"city-background\" style=\"background-image: url(https://source.unsplash.com/1200x200/?".concat(changeCityName, ";\">\n            </div>\n          "));
                res.write("\n            <h1 class=\"title-red\" style=\"margin-bottom:0;\">\n              Current\n            </h1>\n            <div>\n              <hr class=\"border\">\n              <h1 class=\"title-blue\" style=\"margin-bottom:0;\">\n                ".concat(weatherDescription, "\n              </h1>\n              <img class=\"img-current\" src=").concat(imageURL, ">\n              <h1 class=\"temp\" style=\"margin-top:0;\">\n                ").concat(temp, " &#8451;\n              </h1>\n            </div>\n          "));
                res.write("\n            <h1 class=\"title-red\" style=\"margin: 1rem 0 0 0;\">\n              Temperature detail\n            </h1>\n            <div>\n              <hr class=\"border\">\n              <h1 class=\"title-blue\" style=\"margin-bottom:0;\">\n                Max: ".concat(maxTemp, " &#8451;\n              </h1>\n              <h1 class=\"title-red\" style=\"margin-top:0;\">\n                Min: ").concat(minTemp, " &#8451;\n              </h1>\n              <hr class=\"border\" style=\"margin-bottom: 2rem\">\n            </div>\n          "));
                res.write("\n            <a id=\"daily-link\">\n            </a>\n            <form onSubmit=\"{e => e.preventDefault}\" style=\"text-align: center;\">\n              <button type=\"submit\"; name=\"button\" class=\"home\">\n                Home\n              </button>\n            </form>\n          ");
                //  daily weather
                var lon = weatherData.coord.lon;
                var lat = weatherData.coord.lat;
                var urlGeo = "https://api.openweathermap.org/data/2.5/onecall?lat=".concat(lat, "&lon=").concat(lon, "&units=").concat(unit, "&appid=6ead27bdb26041ed3ea800802ff72381");
                https.get(urlGeo, function (response) {
                    var resultData = "";
                    response.on("data", function (data) { return (resultData += data); });
                    response.on("end", function () {
                        var weatherData = JSON.parse(resultData);
                        // basic daily data
                        var dailyTempMinList = [];
                        var dailyTempMaxList = [];
                        var dailyTempDescriptionList = [];
                        var dailyIconList = [];
                        var dailyImageUrlList = [];
                        // related to date
                        var datesList = [];
                        var monthsList = [];
                        var daysList = [];
                        var weekdayList = [];
                        var refinedDatesList = [];
                        var weekday = new Array(13);
                        weekday[0] = "(Sun)";
                        weekday[1] = "(Mon)";
                        weekday[2] = "(Tue)";
                        weekday[3] = "(Wed)";
                        weekday[4] = "(Thu)";
                        weekday[5] = "(Fri)";
                        weekday[6] = "(Sat)";
                        weekday[7] = "(Sun)";
                        weekday[8] = "(Mon)";
                        weekday[9] = "(Tue)";
                        weekday[10] = "(Wed)";
                        weekday[11] = "(Thu)";
                        weekday[12] = "(Fri)";
                        weekday[13] = "(Sat)";
                        // create whole daily data list
                        for (var i = 0; i < 7; i++) {
                            dailyTempMinList.push(weatherData.daily[i].temp.min.toFixed(1));
                            dailyTempMaxList.push(weatherData.daily[i].temp.max.toFixed(1));
                            dailyTempDescriptionList.push(weatherData.daily[i].weather[0].description);
                            dailyIconList.push(weatherData.daily[i].weather[0].icon);
                            dailyImageUrlList.push("http://openweathermap.org/img/wn/".concat(weatherData.daily[i].weather[0].icon, "@2x.png"));
                            datesList.push(new Date(new Date().getTime() + 24 * 60 * 60 * 1000 * i));
                            weekdayList.push(weekday[datesList[0].getDay() + i]);
                            monthsList.push(datesList[i].getMonth() + 1);
                            daysList.push(datesList[i].getDate());
                            refinedDatesList.push("".concat(monthsList[i], "/").concat(daysList[i]).concat(weekdayList[i]));
                        }
                        // display daily data lists
                        res.write("\n                <h1 class=\"title-red\" style=\"margin: 4rem 0 0 0\">\n                  Daily\n                </h1>\n                <hr class=\"border\">\n                <div class=\"daily-element__container\">\n                  <div class=\"daily-element__wrapper\">\n              ");
                        for (var i = 0; i < 7; i++) {
                            res.write("\n                    <div class=\"daily-element-center\">\n                      <h2 class=\"date\">\n                        ".concat(refinedDatesList[i], "\n                      </h2>\n                      <img style=\"width:60px;\" src=").concat(dailyImageUrlList[i], ">\n                      <h2 class=\"daily-temp\">\n                        ").concat(dailyTempMaxList[i], " / ").concat(dailyTempMinList[i], " &#8451\n                      </h2>\n                      <h2 class=\"daily-description\">\n                        ").concat(dailyTempDescriptionList[i], "\n                      </h2>\n                    </div>\n                  "));
                        }
                        res.write("\n                  </div>\n                </div>\n                <hr class=\"border\">\n              ");
                        res.write("\n                <a id=\"hourly-link\">\n                </a>\n                <form onSubmit=\"{e => e.preventDefault}\" style=\"text-align: center;\">\n                  <button type=\"submit\"; name=\"button\" class=\"home\">\n                    Home\n                  </button>\n                </form>\n              ");
                        // hourly weather
                        // basic hourly data
                        var hourlyTempList = [];
                        var hourlyDescriptionList = [];
                        var hourlyIconList = [];
                        var hourlyImageUrlList = [];
                        // get am/pm time
                        var ampmList = [];
                        var ampmHourList = [];
                        // display am/pm time
                        var refinedHourList = [];
                        // create whole hourly data list
                        for (var i = 0; i < 24; i++) {
                            hourlyTempList.push(weatherData.hourly[i].temp.toFixed(1));
                            hourlyDescriptionList.push(weatherData.hourly[i].weather[0].description);
                            hourlyIconList.push(weatherData.hourly[i].weather[0].icon);
                            hourlyImageUrlList.push("http://openweathermap.org/img/wn/".concat(weatherData.hourly[i].weather[0].icon, "@2x.png"));
                            var hours = datesList[0].getHours() + i;
                            hours = hours <= 24 ? hours : hours - 24;
                            ampmList.push(hours >= 12 ? "pm" : "am");
                            hours = hours % 12;
                            hours = hours ? hours : 12;
                            ampmHourList.push(hours);
                            refinedHourList.push("".concat(ampmHourList[i], ":00").concat(ampmList[i]));
                        }
                        // display 24hours(optional)
                        // let refined24HoursList = [];
                        // for (let i = 0; i < 24; i++) {
                        //   refined24HoursList.push(`${hourList[i]}:00`);
                        // }
                        // display hourly data
                        res.write("\n                <h1 class=\"title-red\" style=\"margin: 4rem 0 0 0;\">\n                  Hourly\n                </h1>\n                <hr class=\"border\">\n                <div class=\"hourly-element__container\">\n                  <div class=\"hourly-element__wrapper\">\n              ");
                        for (var i = 0; i < 24; i++) {
                            res.write("\n                  <div class=\"hourly-element-center\">\n                      <h3 class=\"hour\">\n                        ".concat(refinedHourList[i], "\n                      </h3>\n                      <img style=\"width:40px;\" src=").concat(hourlyImageUrlList[i], ">\n                      <h3 class=\"hourly-temp\">\n                        ").concat(hourlyTempList[i], " &#8451;\n                      </h3>\n                      <h3 class=\"hourly-description\">\n                        ").concat(hourlyDescriptionList[i], "\n                      </h3>\n                  </div>\n                "));
                        }
                        res.write("\n                </div>\n              </div>\n              <hr class=\"border\" style=\"margin-bottom: 2rem;\">\n            ");
                        res.write("\n                <form onSubmit=\"{e => e.preventDefault}\" style=\"text-align: center;margin-bottom: 0 0 3rem 0\">\n                  <button class=\"home\" type=\"submit\"; name=\"button\">\n                    Home\n                  </button>\n                </form>\n              ");
                        res.send();
                    });
                });
            }
            else if (query == "") {
                alert("Please enter any city name");
                res.redirect("/");
            }
            else {
                alert("This city name is not found");
                res.redirect("/");
            }
        });
    });
});
app.listen(port, function () {
    console.log("Server is running on port 3000");
});
