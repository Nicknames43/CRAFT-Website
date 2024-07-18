const mongoose = require("mongoose")
const propertyScheme = require("./OldProperty")

const phaseSchema = new mongoose.Schema(
  {
    phaseName: {
      type: String,
      required: true,
    },
    approved: {
      type: Boolean,
      required: true,
    },
    numHomes: {
      type: Number,
      required: true,
    },
    numSingle: {
      type: Number,
    },
    numSemi: {
      type: Number,
    },
    numTownHome: {
      type: Number,
    },
    numCondo: {
      type: Number,
    },
    phaseArea: {
      type: Number,
      required: true,
    },
  },
  { _id: false }
)

module.exports = propertyScheme.discriminator(
  "residentialProperty",
  new mongoose.Schema({
    residentialType: {
      type: String,
      required: true,
    },
    totNumHomes: {
      type: Number,
      required: true,
    },
    purchasable: {
      type: Boolean,
      required: true,
    },
    totNumSingle: {
      type: Number,
    },
    totNumSemi: {
      type: Number,
    },
    totNumTownHome: {
      type: Number,
    },
    totNumCondo: {
      type: Number,
    },
    siteArea: {
      type: Number,
    },
    phases: {
      type: [phaseSchema],
      required: true,
      default: undefined,
    },
  })
)
