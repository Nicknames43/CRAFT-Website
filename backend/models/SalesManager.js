const mongoose = require("mongoose")

const salesManagerSchema = new mongoose.Schema({
  name: {
    type: String,
    default: "",
  },
  number: {
    type: String,
    default: "",
  },
  email: {
    type: String,
    default: "",
  },
  url: {
    type: String,
    default: "",
  },
})

module.exports = mongoose.model("salesManager", salesManagerSchema)
