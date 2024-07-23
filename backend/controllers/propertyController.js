const Property = require("../models/Property")
const CProperty = require("../models/commercialProperty")
const RProperty = require("../models/residentialProperty")
const SalesManager = require("../models/SalesManager")
const fs = require("fs")
const path = require("path")

const validT = ["Commercial", "Residential"]

// @desc Get all properties
// @route GET /properties/all
// @access Public
const getAllProperties = async (req, res) => {
  const properties = await Property.find().lean()
  if (!properties?.length) {
    return res.status(400).json({ message: "No properties found" })
  }
  res.json(properties)
}

// @desc Get all published properties
// @route GET /properties
// @access Public
const getAllPublishedProperties = async (req, res) => {
  const properties = await Property.find({ published: true })
    .select("-published")
    .lean()
  if (!properties?.length) {
    return res.status(400).json({ message: "No properties found" })
  }
  res.json(properties)
}

// @desc Get all property
// @route GET /properties/:id
// @access Private
const getProperty = async (req, res) => {
  const id = req.params.id
  const property = await Property.findById(id).lean().exec()
  if (!property) {
    return res.status(400).json({ message: "Property not found" })
  }
  res.json(property)
}

// @desc Create new prperty
// @route POST /properties
// @access Private
const createNewProperty = async (req, res) => {
  const {
    published,
    featured,
    name,
    country,
    province,
    city,
    streetName,
    streetNum,
    postalCode,
    description,
    developed,
    salesManager,
    salesURL,
    dateCompleted,
    t,
  } = req.body
  const siteArea = parseInt(req.body.siteArea, 10)
  const latitude = Number(req.body.latitude)
  const longitude = Number(req.body.longitude)
  const dateCompletedN = Date.parse(dateCompleted)
  const files = req.files ?? []
  const message = {}
  let failed = false
  const property = {}

  // image stuff to be changed later (cloud storage)
  property.images = []
  for (file of files) {
    const parsedPath = path.parse(file.path)
    const dirPathArray = parsedPath.dir.split(path.sep)
    const filePath = path.join(
      dirPathArray[dirPathArray.length - 1],
      parsedPath.base
    )
    property.images.push(filePath)
  }

  if (typeof name !== "string" || !name) {
    failed = true
    message.name = "Name string is required"
  } else {
    const duplicate = await Property.findOne({ name })
      .collation({ locale: "en", strength: 2 })
      .exec()
    if (duplicate) {
      failed = true
      message.name = "A property with that name already exists"
    } else {
      property.name = name
    }
  }
  if (typeof country !== "string" || !country) {
    failed = true
    message.country = "Country string is required"
  } else {
    property.country = country
  }
  if (typeof province !== "string" || !province) {
    failed = true
    message.province = "Province string is required"
  } else {
    property.province = province
  }
  if (typeof city !== "string" || !city) {
    failed = true
    message.city = "City string is required"
  } else {
    property.city = city
  }
  if (typeof streetName !== "string" || !streetName) {
    failed = true
    message.streetName = "Street name string is required"
  } else {
    property.streetName = streetName
  }
  if (typeof streetNum !== "string" || !streetNum) {
    failed = true
    message.streetNum = "Street number(s) string is required"
  } else {
    property.streetNum = streetNum
  }
  if (typeof postalCode !== "string" || !postalCode) {
    failed = true
    message.postalCode = "Postal code string is required"
  } else {
    property.postalCode = postalCode
  }
  if (isNaN(latitude) || latitude < -90 || latitude > 90) {
    failed = true
    message.latitude =
      "Latitude must be a number from -90 (inclusive) to 90 (inclusive)"
  } else {
    property.latitude = latitude
  }
  if (isNaN(longitude) || longitude < -180 || longitude >= 180) {
    failed = true
    message.longitude =
      "Longitude must be a number from -180 (inclusive) to 180 (exclusive)"
  } else {
    property.longitude = longitude
  }
  if (typeof description !== "string" || !description) {
    failed = true
    message.description = "Description string is required"
  } else {
    property.description = description
  }
  if (isNaN(siteArea) || siteArea <= 0) {
    failed = true
    message.siteArea = "Site area must be a number greater than 0"
  } else {
    property.siteArea = siteArea
  }

  if (!isNaN(dateCompletedN)) {
    property.dateCompleted = new Date(dateCompletedN)
    //.toISOString().split("T")[0]
  } else if (dateCompleted && dateCompleted !== "yyyy-mm-dd") {
    failed = true
    message.dateCompleted =
      "Date completed must be a string in the form yyyy-mm-dd"
  }

  if (typeof t !== "string" || !t) {
    failed = true
    message.t = "Must provide whether the property is commercial or residential"
  } else if (validT.includes(t) === -1) {
    failed = true
    message.t = `Property cannot be of type ${t}`
  }

  if (typeof developed === "string") {
    if (developed.toLowerCase() === "true") {
      property.developed = true
    } else if (developed.toLowerCase() === "false") {
      property.developed = false
    } else {
      failed = true
      message.developed = "Must be either true or false"
    }
  } else if (typeof developed === "boolean") {
    if (developed) {
      property.developed = true
    } else {
      property.developed = false
    }
  } else {
    failed = true
    message.developed = "Must be either true or false"
  }

  if (typeof published === "string") {
    if (published.toLowerCase() === "true") {
      property.published = true
    } else if (published.toLowerCase() === "false") {
      property.published = false
    } else {
      failed = true
      message.published = "Must be either true or false"
    }
  } else if (typeof published === "boolean") {
    if (published) {
      property.published = true
    } else {
      property.published = false
    }
  } else {
    failed = true
    message.published = "Must be either true or false"
  }

  if (typeof featured === "string") {
    if (featured.toLowerCase() === "true") {
      property.featured = true
    } else if (featured.toLowerCase() === "false") {
      property.featured = false
    } else {
      failed = true
      message.featured = "Must be either true or false"
    }
  } else if (typeof featured === "boolean") {
    if (featured) {
      property.featured = true
    } else {
      property.featured = false
    }
  } else {
    failed = true
    message.featured = "Must be either true or false"
  }

  if (typeof salesManager !== "undefined") {
    const sm = await SalesManager.findById(salesManager)
    if (sm) {
      property.salesManager = sm._id
    } else {
      failed = true
      message.salesManager = "Sales manager not found"
    }
  }

  if (typeof salesURL === "string" && salesURL) property.salesURL = salesURL

  if (t === "commercialProperty") {
    const type = req.body.type
    const size = parseInt(req.body.size, 10)
    const featuredTenants = req.body.featuredTenants
    const leaseSize = parseInt(req.body.leaseSize, 10)

    if (isNaN(size) || size <= 0) {
      failed = true
      message.size = "Size must be a number greater than 0"
    } else {
      property.size = size
    }
    if (Array.isArray(featuredTenants)) {
      for (const f of featuredTenants) {
        if (typeof f !== "string" || !f) {
          failed = true
          message.featuredTenantsValues =
            "featured tenants array contains non-strings"
        }
      }
      property.featuredTenants = featuredTenants
    }
    if (!isNaN(leaseSize) && leaseSize > 0) {
      property.leaseSize = leaseSize
    }
    if (typeof type !== "string" || !type) {
      failed = true
      message.type = "Type string is required"
    } else {
      property.type = type
    }
  } else if (t === "residentialProperty") {
    const { numSingle, numSemi, numTownHome, numStacked, numCondo } = req.body
    const numSingleN = Number(numSingle)
    const numSemiN = Number(numSemi)
    const numTownHomeN = Number(numTownHome)
    const numStackedN = Number(numStacked)
    const numCondoN = Number(numCondo)

    count = 0

    if (
      typeof numSingle !== "undefined" &&
      Number.isInteger(numSingleN) &&
      numSingleN > 0
    ) {
      count++
      property.numSingle = numSingleN
    } else if (typeof numSingle !== "undefined") {
      failed = true
      message.numSingle =
        "Number of single units must be an integer greater than 0"
    }
    if (
      typeof numSemi !== "undefined" &&
      Number.isInteger(numSemiN) &&
      numSemiN > 0
    ) {
      count++
      property.numSemi = numSemiN
    } else if (typeof numSemi !== "undefined") {
      failed = true
      message.numSemi = "Number of semi units must be an integer greater than 0"
    }
    if (
      typeof numTownHome !== "undefined" &&
      Number.isInteger(numTownHomeN) &&
      numTownHomeN > 0
    ) {
      count++
      property.numTownHome = numTownHomeN
    } else if (typeof numTownHome !== "undefined") {
      failed = true
      message.numTownHome =
        "Number of town home units must be an integer greater than 0"
    }
    if (
      typeof numStacked !== "undefined" &&
      Number.isInteger(numStackedN) &&
      numStackedN > 0
    ) {
      count++
      property.numStacked = numStackedN
    } else if (typeof numStacked !== "undefined") {
      failed = true
      message.numStacked =
        "Number of stacked town home units must be an integer greater than 0"
    }
    if (
      typeof numCondo !== "undefined" &&
      Number.isInteger(numCondoN) &&
      numCondoN > 0
    ) {
      count++
      property.numCondo = numCondoN
    } else if (typeof numCondo !== "undefined") {
      failed = true
      message.numCondo =
        "Number of condo units must be an integer greater than 0"
    }
    if (count === 0) {
      failed = true
      message.numUnits = "At least 1 of any type of unit is required"
    }
  }

  if (failed) {
    deleteImages(property.images)
    return res.status(400).json(message)
  }

  let prop
  if (t === "commercialProperty") {
    prop = await CProperty.create(property)
  } else if (t === "residentialProperty") {
    prop = await RProperty.create(property)
  }

  if (prop) {
    return res.status(201).json({ message: "New property created" })
  } else {
    deleteImages(property.images)
    return res.status(400).json({ message: "Invalid property data received" })
  }
}

// @desc Update a property
// @route PUT /properties/:id
// @access Private
const updateProperty = async (req, res) => {
  const id = req.params.id
  const {
    published,
    featured,
    name,
    country,
    province,
    city,
    streetName,
    streetNum,
    postalCode,
    description,
    developed,
    salesManager,
    salesURL,
    dateCompleted,
  } = req.body
  const siteArea = parseInt(req.body.siteArea, 10)
  const latitude = Number(req.body.latitude)
  const longitude = Number(req.body.longitude)
  const dateCompletedN = Date.parse(dateCompleted)
  const files = req.files ?? []
  const images = req.body.images ?? []
  const message = {}
  let failed = false

  // image stuff to be changed later (cloud storage)
  const newImages = []
  for (file of files) {
    const parsedPath = path.parse(file.path)
    const dirPathArray = parsedPath.dir.split(path.sep)
    const filePath = path.join(
      dirPathArray[dirPathArray.length - 1],
      parsedPath.base
    )
    newImages.push(filePath)
  }

  const property = await Property.findById(id).exec()
  if (!property) {
    deleteImages(newImages)
    return res.status(400).json({ message: "Property not found" })
  }

  const t = property.__t

  if (typeof name !== "string" || !name) {
    failed = true
    message.name = "Name string is required"
  } else {
    const duplicate = await Property.findOne({ name })
      .collation({ locale: "en", strength: 2 })
      .exec()
    if (duplicate && duplicate?._id.toString() !== id) {
      failed = true
      message.name = "A property with that name already exists"
    } else {
      property.name = name
    }
  }
  if (typeof country !== "string" || !country) {
    failed = true
    message.country = "Country string is required"
  } else {
    property.country = country
  }
  if (typeof province !== "string" || !province) {
    failed = true
    message.province = "Province string is required"
  } else {
    property.province = province
  }
  if (typeof city !== "string" || !city) {
    failed = true
    message.city = "City string is required"
  } else {
    property.city = city
  }
  if (typeof streetName !== "string" || !streetName) {
    failed = true
    message.streetName = "Street name string is required"
  } else {
    property.streetName = streetName
  }
  if (typeof streetNum !== "string" || !streetNum) {
    failed = true
    message.streetNum = "Street number(s) string is required"
  } else {
    property.streetNum = streetNum
  }
  if (typeof postalCode !== "string" || !postalCode) {
    failed = true
    message.postalCode = "Postal code string is required"
  } else {
    property.postalCode = postalCode
  }
  if (isNaN(latitude) || latitude < -90 || latitude > 90) {
    failed = true
    message.latitude =
      "Latitude must be a number from -90 (inclusive) to 90 (inclusive)"
  } else {
    property.latitude = latitude
  }
  if (isNaN(longitude) || longitude < -180 || longitude >= 180) {
    failed = true
    message.longitude =
      "Longitude must be a number from -180 (inclusive) to 180 (exclusive)"
  } else {
    property.longitude = longitude
  }
  if (typeof description !== "string" || !description) {
    failed = true
    message.description = "Description string is required"
  } else {
    property.description = description
  }
  if (isNaN(siteArea) || siteArea <= 0) {
    failed = true
    message.siteArea = "Site area must be a number greater than 0"
  } else {
    property.siteArea = siteArea
  }

  if (!isNaN(dateCompletedN)) {
    property.dateCompleted = new Date(dateCompletedN)
    //.toISOString().split("T")[0]
  } else if (dateCompleted && dateCompleted !== "yyyy-mm-dd") {
    failed = true
    message.dateCompleted =
      "Date completed must be a string in the form yyyy-mm-dd"
  } else {
    property.dateCompleted = undefined
  }

  if (typeof t !== "string" || !t) {
    failed = true
    message.t = "Must provide whether the property is commercial or residential"
  } else if (validT.includes(t) === -1) {
    failed = true
    message.t = `Property cannot be of type ${t}`
  }

  if (typeof developed === "string") {
    if (developed.toLowerCase() === "true") {
      property.developed = true
    } else if (developed.toLowerCase() === "false") {
      property.developed = false
    } else {
      failed = true
      message.developed = "Must be either true or false"
    }
  } else if (typeof developed === "boolean") {
    if (developed) {
      property.developed = true
    } else {
      property.developed = false
    }
  } else {
    failed = true
    message.developed = "Must be either true or false"
  }

  if (typeof published === "string") {
    if (published.toLowerCase() === "true") {
      property.published = true
    } else if (published.toLowerCase() === "false") {
      property.published = false
    } else {
      failed = true
      message.published = "Must be either true or false"
    }
  } else if (typeof published === "boolean") {
    if (published) {
      property.published = true
    } else {
      property.published = false
    }
  } else {
    failed = true
    message.published = "Must be either true or false"
  }

  if (typeof featured === "string") {
    if (featured.toLowerCase() === "true") {
      property.featured = true
    } else if (featured.toLowerCase() === "false") {
      property.featured = false
    } else {
      failed = true
      message.featured = "Must be either true or false"
    }
  } else if (typeof featured === "boolean") {
    if (featured) {
      property.featured = true
    } else {
      property.featured = false
    }
  } else {
    failed = true
    message.featured = "Must be either true or false"
  }

  if (typeof salesManager !== "undefined") {
    const sm = await SalesManager.findById(salesManager)
    if (sm) {
      property.salesManager = sm._id
    } else {
      failed = true
      message.salesManager = "Sales manager not found"
    }
  } else {
    property.salesManager = undefined
  }

  if (typeof salesURL === "string" && salesURL) {
    property.salesURL = salesURL
  } else {
    property.salesURL = undefined
  }

  if (t === "commercialProperty") {
    const type = req.body.type
    const size = parseInt(req.body.size, 10)
    const featuredTenants = req.body.featuredTenants
    const leaseSize = req.body.leaseSize
    const leaseSizeN = parseInt(leaseSize, 10)

    if (isNaN(size) || size <= 0) {
      failed = true
      message.size = "Size must be a number greater than 0"
    } else {
      property.size = size
    }
    if (typeof featuredTenants === "undefined") {
      property.featuredTenants = undefined
    } else if (Array.isArray(featuredTenants)) {
      for (const f of featuredTenants) {
        if (typeof f !== "string" || !f) {
          failed = true
          message.featuredTenants =
            "featured tenants array contains non-strings"
        }
      }
      property.featuredTenants = featuredTenants
    } else {
      message.featuredTenants = "featured tenants must be an array of strings"
    }
    if (
      typeof leaseSize === "undefined" ||
      (!isNaN(leaseSizeN) && leaseSizeN === 0)
    ) {
      property.leaseSize = undefined
    } else if (!isNaN(leaseSizeN) && leaseSizeN >= 0) {
      property.leaseSize = leaseSizeN
    } else {
      message.leaseSize = "Lease size must be a number greater than 0"
    }
    if (typeof type !== "string" || !type) {
      failed = true
      message.type = "Type string is required"
    } else {
      property.type = type
    }
  } else if (t === "residentialProperty") {
    const { numSingle, numSemi, numTownHome, numStacked, numCondo } = req.body
    const numSingleN = Number(numSingle)
    const numSemiN = Number(numSemi)
    const numTownHomeN = Number(numTownHome)
    const numStackedN = Number(numStacked)
    const numCondoN = Number(numCondo)

    count = 0

    if (typeof numSingle === "undefined" || numSingleN === 0) {
      property.numSingle = undefined
    } else if (Number.isInteger(numSingleN) && numSingleN > 0) {
      count++
      property.numSingle = numSingleN
    } else {
      failed = true
      message.numSingle =
        "Number of single units must be an integer greater than 0"
    }
    if (typeof numSemi === "undefined" || numSemiN === 0) {
      property.numSemi = undefined
    } else if (Number.isInteger(numSemiN) && numSemiN > 0) {
      count++
      property.numSemi = numSemiN
    } else {
      failed = true
      message.numSemi = "Number of semi units must be an integer greater than 0"
    }
    if (typeof numTownHome === "undefined" || numTownHomeN === 0) {
      property.numTownHome = undefined
    } else if (Number.isInteger(numTownHomeN) && numTownHomeN > 0) {
      count++
      property.numTownHome = numTownHomeN
    } else {
      failed = true
      message.numTownHome =
        "Number of town home units must be an integer greater than 0"
    }
    if (typeof numStacked === "undefined" || numStackedN === 0) {
      property.numStacked = undefined
    } else if (Number.isInteger(numStackedN) && numStackedN > 0) {
      count++
      property.numStacked = numStackedN
    } else {
      failed = true
      message.numStacked =
        "Number of stacked town home units must be an integer greater than 0"
    }
    if (typeof numCondo === "undefined" || numCondoN === 0) {
      property.numCondo = undefined
    } else if (Number.isInteger(numCondoN) && numCondoN > 0) {
      count++
      property.numCondo = numCondoN
    } else {
      failed = true
      message.numCondo =
        "Number of condo units must be an integer greater than 0"
    }
    if (count === 0) {
      failed = true
      message.numUnits = "At least 1 of any type of unit is required"
    }
  }

  if (failed) {
    deleteImages(newImages)
    return res.status(400).json(message)
  }

  const oldImages = property.images
  property.images = images
  for (image of newImages) {
    property.images.push(image)
  }

  await property
    .save()
    .then(() => {
      for (image of oldImages) {
        if (!images.includes(image)) {
          fs.unlinkSync(image)
        }
      }
      return res.json({ message: `${property.name} updated` })
    })
    .catch((err) => {
      console.log(err)
      deleteImages(newImages)
      return res
        .status(400)
        .json({ message: `${property.name} was not updated` })
    })
}

// @desc Delete a property
// @route DELETE /properties/:id
// @access Private
const deleteProperty = async (req, res) => {
  const id = req.params.id
  const property = await Property.findById(id).lean().exec()

  if (!property) {
    return res.status(400).json({ message: "Property not found" })
  }

  deleteImages(property.images)

  await Property.deleteOne(property)
  res.json({ message: `${id} deleted` })
}

const deleteImages = (images) => {
  for (file of images) {
    fs.unlinkSync(file)
  }
}

module.exports = {
  getAllProperties,
  getAllPublishedProperties,
  getProperty,
  createNewProperty,
  updateProperty,
  deleteProperty,
}
