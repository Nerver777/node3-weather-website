const request = require("request");
const geocode = (address, cb) => {
  if (!address) return cb("No address has been given");
  const locationUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoiZmF0Y2F5eWF6emkiLCJhIjoiY2s3YnlzeDNxMDZsbTNncGRkaWloejBheSJ9.6H4OOA0xQk4tKA1Asrj8HA&limit=1`;

  request({ url: locationUrl, json: true }, (error, { body }) => {
    if (error) {
      cb("Unable to connect to location services", undefined);
    } else if (body.features.length === 0) {
      cb("Unable to find location", undefined);
    } else {
      //console.log(cb);
      cb(undefined, {
        lat: body.features[0].center[1],
        long: body.features[0].center[0],
        location: body.features[0].place_name
      });
    }
  });
};

module.exports = geocode;
