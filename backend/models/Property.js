const mongoose = require("mongoose")

const propertySchema = new mongoose.Schema({
  _id: String,
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  salesManagerName: {
    type: String,
    default: "",
  },
  salesManagerPhone: {
    type: String,
    default: "",
  },
  salesManagerEmail: {
    type: String,
    default: "",
  },
  salesURL: {
    type: String,
    default: "",
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
  status: {
    type: [String],
    required: true,
    default: undefined,
  },
})

module.exports = mongoose.model("Property", propertySchema)