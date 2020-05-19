const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");
//define path for express config
const publicDirPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
const port = process.env.PORT || 3000;

//setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);
//static directory to serve
app.use(express.static(publicDirPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Andrey"
  });
});
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Andrey"
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "This is some text",
    title: "Help",
    name: "Andrey"
  });
});

app.get("/weather", (req, res) => {
  //res.send({ forecast: "Sunny", location: "Paris" });
  if (!req.query.address) {
    return res.send({
      error: "You must provide address information"
    });
  }
  geocode(req.query.address, (error, { lat, long, location } = {}) => {
    if (error) {
      return res.send({ error });
    }

    forecast(lat, long, (error, forecastData) => {
      if (error) {
        return res.send({ error: error });
      }
      //console.log(location);
      //console.log(forecastData);
      res.send({
        forecast: forecastData,
        location,
        address: req.query.address
      });
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term"
    });
  }
  console.log(req.query.search);
  res.send({
    products: []
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    errorMsg: "Help article not found",
    name: "Andrey"
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    errorMsg: "Page not found",
    name: "Andrey"
  });
});

app.listen(port, () => {
  console.log("server is up on port " + port);
});
