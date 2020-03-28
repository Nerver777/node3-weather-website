const request = require("request");

let forecast = (lat, long, cb) => {
  let url = `https://api.darksky.net/forecast/662a5a6c23420b20704950d5fab4ddf6/${lat},${long}?units=si`;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      cb("Unable to connect to weather service!", undefined);
    } else if (body.code === 400) {
      cb(body.error, undefined);
    } else {
      let data = `${body.daily.data[0].summary} Its currently ${body.currently.temperature} degrees out. There is a ${body.currently.precipProbability}% chance of rain `;
      cb(undefined, data);
    }
  });
};

module.exports = forecast;
