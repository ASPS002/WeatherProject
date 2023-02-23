const { response } = require("express");
const express = require("express");
const https = require('node:https');
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", function (req, res) {

    res.sendFile(__dirname + "/index.html");

    // res.send("server is up and running")
});

app.post("/", function (req, res) {
    console.log(req.body.cityName);
    console.log("post request recieved.");
    const query = req.body.cityName;
    const apiKey = "4d6eb0ea7754eb82dd9e44b32c6c2024";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;
    https.get(url, function (response) {
        console.log(response.statusCode);

        response.on("data", function (data) {
            // console.log(data);
            const weatherData = JSON.parse(data);
            // console.log(weatherData);
            // const object = {
            //     name : "Ujjwal",
            //     favouriteFood:"Chilli Paneer"
            // }
            // console.log(JSON.stringify(object));
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.write("<p>The weather description is " + weatherDescription + " </p>");
            res.write("<h1>The temperature in " + query + " is " + temp + " degree Celsius</h1>");
            res.write("<img src = " + imageURL + ">")
            res.send();
        });

    });

});




app.listen(3000, function () {
    console.log("server is running on port 3000")
})