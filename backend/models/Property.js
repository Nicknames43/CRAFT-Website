const mongoose = require("mongoose")

const propertySchema = new mongoose.Schema({
  pid: {
    type: String,
    required: true,
  },
  published: {
    type: Boolean,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  province: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  streetName: {
    type: String,
    required: true,
  },
  streetNum: {
    type: String,
    required: true,
  },
  postalCode: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  siteArea: {
    type: Number,
    required: true,
  },
  developed: {
    type: Boolean,
    required: true,
  },
  salesManager: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SalesManager",
  },
  salesURL: {
    type: String,
  },
  images: {
    type: [String],
  },
})

module.exports = mongoose.model("Property", propertySchema)
