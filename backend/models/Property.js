const mongoose = require("mongoose")

const propertySchema = new mongoose.Schema({
  published: {
    type: Boolean,
    required: true,
  },
  featured: {
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
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
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
  dateCompleted: {
    type: Date,
  },
  images: {
    type: [String],
  },
})

module.exports = mongoose.model("Property", propertySchema)
