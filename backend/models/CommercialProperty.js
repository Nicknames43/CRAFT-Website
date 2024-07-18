const mongoose = require("mongoose")
const propertyScheme = require("./Property")

module.exports = propertyScheme.discriminator(
  "commercialProperty",
  new mongoose.Schema({
    size: {
      type: Number,
      required: true,
    },
    featuredTenants: {
      type: [String],
    },
    leaseSize: {
      type: Number,
    },
    type: {
      type: String,
      required: true,
    },
  })
)
