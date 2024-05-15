const mongoose = require("mongoose")
const propertyScheme = require("./Property")

const unitSchema = new mongoose.Schema(
  {
    unit: {
      type: String,
      required: true,
    },
    tenant: {
      type: String,
      required: true,
    },
    space: {
      type: Number,
      required: true,
    },
    lease: {
      type: Boolean,
      required: true,
    },
  },
  { _id: false }
)

const buildingSchema = new mongoose.Schema(
  {
    buildingName: {
      type: String,
      required: true,
    },
    units: {
      type: [unitSchema],
      required: true,
      default: undefined,
    },
  },
  { _id: false }
)

module.exports = propertyScheme.discriminator(
  "commercialProperty",
  new mongoose.Schema({
    commercialType: {
      type: String,
      required: true,
    },
    totSize: {
      type: Number,
      required: true,
    },
    leaseSize: {
      type: Number,
      default: 0,
    },
    siteArea: {
      type: Number,
    },
    tenantMix: {
      type: String,
      required: true,
    },
    featured: {
      type: [String],
      required: true,
    },
    buildings: {
      type: [buildingSchema],
      required: true,
      default: undefined,
    },
  })
)
