const mongoose = require("mongoose")
const propertyScheme = require("./Property")

module.exports = propertyScheme.discriminator(
  "residentialProperty",
  new mongoose.Schema({
    numSingle: {
      type: Number,
    },
    numSemi: {
      type: Number,
    },
    numTownHome: {
      type: Number,
    },
    numStacked: {
      type: Number,
    },
    numCondo: {
      type: Number,
    },
  })
)
