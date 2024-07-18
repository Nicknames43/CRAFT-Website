const Property = require("../models/OldProperty")
const CProperty = require("../models/OldCommercialProperty")
const RProperty = require("../models/OldResidentialProperty")
const fs = require("fs")
const path = require("path")

const validStatus = [
  "Developed",
  "Under Development",
  "Leasing Opportunities",
  "Sold",
  "Owned",
]

// @desc Get all properties
// @route GET /properties
// @access Public
const getAllProperties = async (req, res) => {
  const properties = await Property.find().lean()
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
    name,
    type,
    salesManagerName,
    salesManagerPhone,
    salesManagerEmail,
    salesURL,
    streetNum,
    streetName,
    city,
    province,
    country,
    postalCode,
    status,
    propDetails,
  } = req.body
  const files = req.files

  if (files.length < 1) {
    return res.status(400).json({ message: "At least 1 image required" })
  }

  const images = []
  for (file of files) {
    const parsedPath = path.parse(file.path)
    const dirPathArray = parsedPath.dir.split(path.sep)
    const filePath = path.join(
      dirPathArray[dirPathArray.length - 1],
      parsedPath.base
    )
    images.push(filePath)
  }

  if (
    typeof name !== "string" ||
    typeof type !== "string" ||
    typeof streetName !== "string" ||
    typeof streetNum !== "string" ||
    typeof city !== "string" ||
    typeof province !== "string" ||
    typeof country !== "string" ||
    typeof postalCode !== "string" ||
    !Array.isArray(status) ||
    status.length === 0 ||
    Object.prototype.toString.call(propDetails) !== "[object Object]"
  ) {
    deleteImages(images)
    return res.status(400).json({ message: "All fields are required" })
  }

  for (const s of status) {
    if (validStatus.indexOf(s) === -1) {
      deleteImages(images)
      return res.status(400).json({ message: "Invalid status" })
    }
  }

  let property = {
    _id: name.split(" ").join(""),
    name,
    type,
    streetNum,
    streetName,
    city,
    province,
    country,
    postalCode,
    status,
    images,
  }

  if (
    typeof salesURL !== "string" &&
    (typeof salesManagerName !== "string" ||
      (typeof salesManagerEmail !== "string" &&
        typeof salesManagerPhone !== "string"))
  ) {
    deleteImages(images)
    return res
      .status(400)
      .json({ message: "Invalid sales manager information combination" })
  } else if (typeof salesURL === "string") {
    property.salesURL = salesURL
  } else {
    property.salesManagerName = salesManagerName
    if (typeof salesManagerEmail === "string") {
      property.salesManagerEmail = salesManagerEmail
    }
    if (typeof salesManagerPhone === "string") {
      property.salesManagerPhone = salesManagerPhone
    }
  }

  if (type === "Commercial") {
    const { commercialType, tenantMix, featured, buildings } = propDetails
    const siteArea = parseInt(propDetails.siteArea, 10)
    if (
      typeof commercialType !== "string" ||
      typeof tenantMix !== "string" ||
      !Array.isArray(featured) ||
      Object.prototype.toString.call(buildings) !== "[object Object]"
    ) {
      deleteImages(images)
      return res.status(400).json({ message: "All fields are required" })
    }

    for (const f of featured) {
      if (typeof f !== "string") {
        deleteImages(images)
        return res.status(400).json({ message: "Invalid featured" })
      }
    }

    const buildingArray = []
    let totSize = 0,
      leaseSize = 0

    for (const [buildingName, units] of Object.entries(buildings)) {
      if (!Array.isArray(units)) {
        deleteImages(images)
        return res.status(400).json({ message: "Invalid units" })
      }

      const unitArray = []
      for (const u of units) {
        const { unit, tenant } = u
        const space = parseInt(u.space, 10)
        const lease = /true/i.test(u.lease) //change this later for undefined

        if (
          typeof unit !== "string" ||
          typeof tenant !== "string" ||
          isNaN(space) ||
          space <= 0 ||
          typeof lease !== "boolean" //not needed currently
        ) {
          deleteImages(images)
          return res.status(400).json({ message: "Invalid unit" })
        }

        if (lease) {
          leaseSize += space
        }
        totSize += space

        unitArray.push(u)
      }

      buildingArray.push({ buildingName, units: unitArray })
    }

    property = {
      ...property,
      commercialType,
      totSize,
      leaseSize,
      tenantMix,
      featured,
      buildings: buildingArray,
    }
    if (!isNaN(siteArea) && siteArea > 0) {
      property.siteArea = siteArea
    }

    const prop = await CProperty.create(property)
    if (prop) {
      return res.status(201).json({ message: "New property created" })
    } else {
      deleteImages(images)
      return res.status(400).json({ message: "Invalid property data received" })
    }
  } else if (type === "Residential") {
    const { residentialType, purchaseable, phases } = propDetails

    if (
      typeof residentialType !== "string" ||
      typeof purchaseable !== "boolean" ||
      Object.prototype.toString.call(phases) !== "[object Object]"
    ) {
      deleteImages(images)
      return res.status(400).json({ message: "All fields are required" })
    }

    let totNumHomes = 0,
      totNumSingle = 0,
      totNumSemi = 0,
      totNumTownHome = 0,
      totNumCondo = 0,
      siteArea = 0,
      numHomes
    const phaseArray = []

    for (const [phaseName, phase] of Object.entries(phases)) {
      const numSingle = parseInt(phase.numSingle, 10)
      const numSemi = parseInt(phase.numSemi, 10)
      const numTownHome = parseInt(phase.numTownHome, 10)
      const numCondo = parseInt(phase.numCondo, 10)
      const phaseArea = parseInt(phase.phaseArea, 10)
      const approved = /true/i.test(phase.approved) //change this later for undefined

      if (typeof phaseName !== "string" || typeof approved !== "boolean") {
        deleteImages(images)
        return res.status(400).json({ message: "All fields are required" })
      }
      const newPhase = { phaseName, approved }
      numHomes = 0

      if (isNaN(numSingle) || numSingle < 0) {
        deleteImages(images)
        return res
          .status(400)
          .json({ message: "Invalid number of Single Homes" })
      } else if (!isNaN(numSingle) && numSingle > 0) {
        totNumSingle += numSingle
        numHomes += numSingle
        newPhase.numSingle = numSingle
      }
      if (isNaN(numSemi) || numSemi < 0) {
        deleteImages(images)
        return res.status(400).json({ message: "Invalid number of Semi Homes" })
      } else if (!isNaN(numSemi) && numSemi > 0) {
        totNumSemi += numSemi
        numHomes += numSemi
        newPhase.numSemi = numSemi
      }
      if (isNaN(numTownHome) || numTownHome < 0) {
        deleteImages(images)
        return res.status(400).json({ message: "Invalid number of Townhomes" })
      } else if (!isNaN(numTownHome) && numTownHome > 0) {
        totNumTownHome += numTownHome
        numHomes += numTownHome
        newPhase.numTownHome = numTownHome
      }
      if (isNaN(numCondo) || numCondo < 0) {
        deleteImages(images)
        return res.status(400).json({ message: "Invalid number of Condos" })
      } else if (!isNaN(numCondo) && numCondo > 0) {
        totNumCondo += numCondo
        numHomes += numCondo
        newPhase.numCondo = numCondo
      }
      if (isNaN(phaseArea) && phaseArea < 0) {
        deleteImages(images)
        return res.status(400).json({ message: "Invalid phase area" })
      } else if (!isNaN(phaseArea) && phaseArea > 0) {
        siteArea += phaseArea
        newPhase.phaseArea = phaseArea
      }

      phaseArray.push(newPhase)
      totNumHomes += numHomes
    }

    property = {
      ...property,
      residentialType,
      purchaseable,
      totNumHomes,
      phases: phaseArray,
    }
    if (totNumSingle > 0) {
      property.totNumSingle = totNumSingle
    }
    if (totNumSemi > 0) {
      property.totNumSemi = totNumSemi
    }
    if (totNumTownHome > 0) {
      property.totNumTownHome = totNumTownHome
    }
    if (totNumCondo > 0) {
      property.totNumCondo = totNumCondo
    }
    if (siteArea > 0) {
      property.siteArea = siteArea
    }

    const prop = await RProperty.create(property)
    if (prop) {
      return res.status(201).json({ message: "New property created" })
    } else {
      deleteImages(images)
      return res.status(400).json({ message: "Invalid property data received" })
    }
  }
}

// @desc Update a property
// @route PUT /properties/:id
// @access Private
const updateProperty = async (req, res) => {
  const id = req.params.id
  const {
    name,
    type,
    salesManagerName,
    salesManagerPhone,
    salesManagerEmail,
    salesURL,
    streetNum,
    streetName,
    city,
    province,
    country,
    postalCode,
    status,
    propDetails,
    images,
  } = req.body
  const files = req.files

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

  if (
    typeof name !== "string" ||
    typeof type !== "string" ||
    typeof streetName !== "string" ||
    typeof streetNum !== "string" ||
    typeof city !== "string" ||
    typeof province !== "string" ||
    typeof country !== "string" ||
    typeof postalCode !== "string" ||
    !Array.isArray(images) ||
    images.length + newImages.length < 1 ||
    !Array.isArray(status) ||
    status.length === 0 ||
    Object.prototype.toString.call(propDetails) !== "[object Object]"
  ) {
    deleteImages(newImages)
    return res.status(400).json({ message: "All fields are required" })
  }

  for (const s of status) {
    if (validStatus.indexOf(s) === -1) {
      deleteImages(newImages)
      return res.status(400).json({ message: "Invalid status" })
    }
  }

  const property = await Property.findById(id).exec()

  if (!property) {
    deleteImages(newImages)
    return res.status(400).json({ message: "Property not found" })
  }

  const duplicate = await Property.findById(name.split(" ").join("")).exec()

  if (duplicate && duplicate?._id.toString() !== id) {
    deleteImages(newImages)
    return res.status(409).json({ message: "Duplicate property name" })
  }

  property._id = name.split(" ").join("")
  property.name = name
  property.streetNum = streetNum
  property.streetName = streetName
  property.city = city
  property.province = province
  property.country = country
  property.postalCode = postalCode
  property.status = status

  if (
    typeof salesURL !== "string" &&
    (typeof salesManagerName !== "string" ||
      (typeof salesManagerEmail !== "string" &&
        typeof salesManagerPhone !== "string"))
  ) {
    deleteImages(newImages)
    return res
      .status(400)
      .json({ message: "Invalid sales manager information combination" })
  } else if (typeof salesURL === "string") {
    property.salesURL = salesURL
  } else {
    property.salesManagerName = salesManagerName
    if (typeof salesManagerEmail === "string") {
      property.salesManagerEmail = salesManagerEmail
    }
    if (typeof salesManagerPhone === "string") {
      property.salesManagerPhone = salesManagerPhone
    }
  }

  if (type === "Commercial") {
    const { commercialType, tenantMix, featured, buildings } = propDetails
    const siteArea = parseInt(propDetails.siteArea, 10)

    if (
      typeof commercialType !== "string" ||
      typeof tenantMix !== "string" ||
      !Array.isArray(featured) ||
      Object.prototype.toString.call(buildings) !== "[object Object]"
    ) {
      deleteImages(newImages)
      return res.status(400).json({ message: "All fields are required" })
    }

    for (const f in featured) {
      if (typeof f !== "string") {
        deleteImages(newImages)
        return res.status(400).json({ message: "Invalid featured" })
      }
    }

    const buildingArray = []
    let totSize = 0,
      leaseSize = 0

    for (const [buildingName, units] of Object.entries(buildings)) {
      if (!Array.isArray(units)) {
        deleteImages(newImages)
        return res.status(400).json({ message: "Invalid units" })
      }

      const unitArray = []
      for (const u of units) {
        const { unit, tenant } = u
        const space = parseInt(u.space, 10)
        const lease = /true/i.test(u.lease) //change this later for undefined

        if (
          typeof unit !== "string" ||
          typeof tenant !== "string" ||
          isNaN(space) ||
          typeof space <= 0 ||
          typeof lease !== "boolean" //not needed currently
        ) {
          deleteImages(newImages)
          return res.status(400).json({ message: "Invalid unit" })
        }

        if (lease) {
          leaseSize += space
        }
        totSize += space

        unitArray.push(u)
      }

      buildingArray.push({ buildingName, units: unitArray })
    }

    property.commercialType = commercialType
    property.totSize = totSize
    property.leaseSize = leaseSize
    property.tenantMix = tenantMix
    property.featured = featured
    property.buildings = buildingArray
    if (!isNaN(siteArea) && siteArea > 0) {
      property.siteArea = siteArea
    }
  } else if (type === "Residential") {
    const { residentialType, purchaseable, phases } = propDetails

    if (
      typeof residentialType !== "string" ||
      typeof purchaseable !== "boolean" ||
      Object.prototype.toString.call(phases) !== "[object Object]"
    ) {
      deleteImages(newImages)
      return res.status(400).json({ message: "All fields are required" })
    }

    let totNumHomes = 0,
      totNumSingle = 0,
      totNumSemi = 0,
      totNumTownHome = 0,
      totNumCondo = 0,
      siteArea = 0,
      numHomes
    const phaseArray = []

    for (const [phaseName, phase] of Object.entries(phases)) {
      const numSingle = parseInt(phase.numSingle, 10)
      const numSemi = parseInt(phase.numSemi, 10)
      const numTownHome = parseInt(phase.numTownHome, 10)
      const numCondo = parseInt(phase.numCondo, 10)
      const phaseArea = parseInt(phase.phaseArea, 10)
      const approved = /true/i.test(phase.approved) //change this later for undefined

      if (typeof phaseName !== "string" || typeof approved !== "boolean") {
        deleteImages(newImages)
        return res.status(400).json({ message: "All fields are required" })
      }
      const newPhase = { phaseName, approved }
      numHomes = 0

      if (isNaN(numSingle) || numSingle < 0) {
        deleteImages(newImages)
        return res
          .status(400)
          .json({ message: "Invalid number of Single Homes" })
      } else if (!isNaN(numSingle) && numSingle > 0) {
        totNumSingle += numSingle
        numHomes += numSingle
        newPhase.numSingle = numSingle
      }
      if (isNaN(numSemi) || numSemi < 0) {
        deleteImages(newImages)
        return res.status(400).json({ message: "Invalid number of Semi Homes" })
      } else if (!isNaN(numSemi) && numSemi > 0) {
        totNumSemi += numSemi
        numHomes += numSemi
        newPhase.numSemi = numSemi
      }
      if (isNaN(numTownHome) || numTownHome < 0) {
        deleteImages(newImages)
        return res.status(400).json({ message: "Invalid number of Townhomes" })
      } else if (!isNaN(numTownHome) && numTownHome > 0) {
        totNumTownHome += numTownHome
        numHomes += numTownHome
        newPhase.numTownHome = numTownHome
      }
      if (isNaN(numCondo) || numCondo < 0) {
        deleteImages(newImages)
        return res.status(400).json({ message: "Invalid number of Condos" })
      } else if (!isNaN(numCondo) && numCondo > 0) {
        totNumCondo += numCondo
        numHomes += numCondo
        newPhase.numCondo = numCondo
      }
      if (isNaN(phaseArea) && phaseArea < 0) {
        deleteImages(newImages)
        return res.status(400).json({ message: "Invalid phase area" })
      } else if (!isNaN(phaseArea) && phaseArea > 0) {
        siteArea += phaseArea
        newPhase.phaseArea = phaseArea
      }

      phaseArray.push(newPhase)
      totNumHomes += numHomes
    }

    property.residentialType = residentialType
    property.purchaseable = purchaseable
    property.totNumHomes = totNumHomes
    property.phases = phaseArray
    if (totNumSingle > 0) {
      property.totNumSingle = totNumSingle
    }
    if (totNumSemi > 0) {
      property.totNumSemi = totNumSemi
    }
    if (totNumTownHome > 0) {
      property.totNumTownHome = totNumTownHome
    }
    if (totNumCondo > 0) {
      property.totNumCondo = totNumCondo
    }
    if (siteArea > 0) {
      property.siteArea = siteArea
    }
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
      res.json({ message: `${property.name} updated` })
    })
    .catch((_err) => {
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
  getProperty,
  createNewProperty,
  updateProperty,
  deleteProperty,
}
