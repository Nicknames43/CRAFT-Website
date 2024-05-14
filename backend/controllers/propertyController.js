const Property = require("../models/Property")
const CProperty = require("../models/commercialProperty")
const RProperty = require("../models/residentialProperty")

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
    return res.status(400).json({ message: "All fields are required" })
  }

  for (const s of status) {
    if (validStatus.indexOf(s) === -1) {
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
  }

  if (
    typeof salesURL !== "string" &&
    (typeof salesManagerName !== "string" ||
      (typeof salesManagerEmail !== "string" &&
        typeof salesManagerPhone !== "string"))
  ) {
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
    const {
      commercialType,
      siteArea,
      tenantMix,
      featured,
      buildings,
      purchaseable,
    } = propDetails
    if (
      typeof commercialType !== "string" ||
      typeof purchaseable !== "boolean" ||
      typeof tenantMix !== "string" ||
      !Array.isArray(featured) ||
      Object.prototype.toString.call(buildings) !== "[object Object]"
    ) {
      return res.status(400).json({ message: "All fields are required" })
    }

    for (const f of featured) {
      if (typeof f !== "string") {
        return res.status(400).json({ message: "Invalid featured" })
      }
    }

    const buildingArray = []
    let totSize = 0,
      leaseSize = 0

    for (const [buildingName, units] of Object.entries(buildings)) {
      if (!Array.isArray(units)) {
        return res.status(400).json({ message: "Invalid units" })
      }

      const unitArray = []
      for (const u of units) {
        const { unit, tenant, space, lease } = u

        if (
          typeof unit !== "string" ||
          typeof tenant !== "string" ||
          typeof space !== "number" ||
          typeof space <= 0 ||
          typeof lease !== "boolean"
        ) {
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
    if (typeof siteArea === "Number" && siteArea > 0) {
      property.siteArea = siteArea
    }

    const prop = await CProperty.create(property)
    if (prop) {
      return res.status(201).json({ message: "New property created" })
    } else {
      return res.status(400).json({ message: "Invalid property data received" })
    }
  } else if (type === "Residential") {
    const { residentialType, purchaseable, phases } = propDetails

    if (
      typeof residentialType !== "string" ||
      typeof purchaseable !== "boolean" ||
      Object.prototype.toString.call(phases) !== "[object Object]"
    ) {
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
      const { numSingle, numSemi, numTownHome, numCondo, phaseArea, approved } =
        phase

      if (typeof phaseName !== "string" || typeof approved !== "boolean") {
        return res.status(400).json({ message: "All fields are required" })
      }
      const newPhase = { phaseName, approved }
      numHomes = 0

      if (typeof numSingle !== "number" || numSingle < 0) {
        return res
          .status(400)
          .json({ message: "Invalid number of Single Homes" })
      } else if (typeof numSingle === "number" && numSingle > 0) {
        totNumSingle += numSingle
        numHomes += numSingle
        newPhase.numSingle = numSingle
      }
      if (typeof numSemi !== "number" || numSemi < 0) {
        return res.status(400).json({ message: "Invalid number of Semi Homes" })
      } else if (typeof numSemi === "number" && numSemi > 0) {
        totNumSemi += numSemi
        numHomes += numSemi
        newPhase.numSemi = numSemi
      }
      if (typeof numTownHome !== "number" || numTownHome < 0) {
        return res.status(400).json({ message: "Invalid number of Townhomes" })
      } else if (typeof numTownHome === "number" && numTownHome > 0) {
        totNumTownHome += numTownHome
        numHomes += numTownHome
        newPhase.numTownHome = numTownHome
      }
      if (typeof numCondo !== "number" || numCondo < 0) {
        return res.status(400).json({ message: "Invalid number of Condos" })
      } else if (typeof numCondo === "number" && numCondo > 0) {
        totNumCondo += numCondo
        numHomes += numCondo
        newPhase.numCondo = numCondo
      }
      if (typeof phaseArea === "number" && phaseArea < 0) {
        return res.status(400).json({ message: "Invalid phase area" })
      } else if (typeof phaseArea === "number" && phaseArea > 0) {
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
  } = req.body

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
    return res.status(400).json({ message: "All fields are required" })
  }

  for (const s of status) {
    if (validStatus.indexOf(s) === -1) {
      return res.status(400).json({ message: "Invalid status" })
    }
  }

  const property = await Property.findById(id).exec()

  if (!property) {
    return res.status(400).json({ message: "Property not found" })
  }

  const duplicate = await Property.findOne({ name })
    .collation({ locale: "en", strength: 2 })
    .lean()
    .exec()

  if (duplicate && duplicate?._id.toString() !== id) {
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
    const {
      commercialType,
      siteArea,
      tenantMix,
      featured,
      buildings,
      purchaseable,
    } = propDetails
    if (
      typeof commercialType !== "string" ||
      typeof purchaseable !== "boolean" ||
      typeof tenantMix !== "string" ||
      !Array.isArray(featured) ||
      Object.prototype.toString.call(buildings) !== "[object Object]"
    ) {
      return res.status(400).json({ message: "All fields are required" })
    }

    for (const f in featured) {
      if (typeof f !== "string") {
        return res.status(400).json({ message: "Invalid featured" })
      }
    }

    const buildingArray = []
    let totSize = 0,
      leaseSize = 0

    for (const [buildingName, units] of Object.entries(buildings)) {
      if (!Array.isArray(units)) {
        return res.status(400).json({ message: "Invalid units" })
      }

      const unitArray = []
      for (const u of units) {
        const { unit, tenant, space, lease } = u

        if (
          typeof unit !== "string" ||
          typeof tenant !== "string" ||
          typeof space !== "number" ||
          typeof space <= 0 ||
          typeof lease !== "boolean"
        ) {
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
    if (typeof siteArea === "Number" && siteArea > 0) {
      property.siteArea = siteArea
    }
  } else if (type === "Residential") {
    const { residentialType, purchaseable, phases } = propDetails

    if (
      typeof residentialType !== "string" ||
      typeof purchaseable !== "boolean" ||
      Object.prototype.toString.call(phases) !== "[object Object]"
    ) {
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
      const { numSingle, numSemi, numTownHome, numCondo, phaseArea, approved } =
        phase

      if (typeof phaseName !== "string" || typeof approved !== "boolean") {
        return res.status(400).json({ message: "All fields are required" })
      }
      const newPhase = { phaseName, approved }
      numHomes = 0

      if (typeof numSingle !== "number" || numSingle < 0) {
        return res
          .status(400)
          .json({ message: "Invalid number of Single Homes" })
      } else if (typeof numSingle === "number" && numSingle > 0) {
        totNumSingle += numSingle
        numHomes += numSingle
        newPhase.numSingle = numSingle
      }
      if (typeof numSemi !== "number" || numSemi < 0) {
        return res.status(400).json({ message: "Invalid number of Semi Homes" })
      } else if (typeof numSemi === "number" && numSemi > 0) {
        totNumSemi += numSemi
        numHomes += numSemi
        newPhase.numSemi = numSemi
      }
      if (typeof numTownHome !== "number" || numTownHome < 0) {
        return res.status(400).json({ message: "Invalid number of Townhomes" })
      } else if (typeof numTownHome === "number" && numTownHome > 0) {
        totNumTownHome += numTownHome
        numHomes += numTownHome
        newPhase.numTownHome = numTownHome
      }
      if (typeof numCondo !== "number" || numCondo < 0) {
        return res.status(400).json({ message: "Invalid number of Condos" })
      } else if (typeof numCondo === "number" && numCondo > 0) {
        totNumCondo += numCondo
        numHomes += numCondo
        newPhase.numCondo = numCondo
      }
      if (typeof phaseArea === "number" && phaseArea < 0) {
        return res.status(400).json({ message: "Invalid phase area" })
      } else if (typeof phaseArea === "number" && phaseArea > 0) {
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

  const updatedProp = await property.save()
  res.json({ message: `${updatedProp.name} updated` })
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

  await Property.deleteOne(property)
  res.json({ message: `${id} deleted` })
}

module.exports = {
  getAllProperties,
  getProperty,
  createNewProperty,
  updateProperty,
  deleteProperty,
}
