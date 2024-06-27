const SalesManager = require("../models/SalesManager")

// @desc Get all salesManagers
// @route GET /salesManagers
// @access Private
const getAllSalesManagers = async (req, res) => {
  const salesManagers = await SalesManager.find().lean()
  if (!salesManagers?.length) {
    return res.status(400).json({ message: "No sales managers found" })
  }
  res.json(salesManagers)
}

// @desc Get individual salesManager
// @route GET /salesManagers/:id
// @access Private
const getSalesManager = async (req, res) => {
  const id = req.params.id
  const salesManager = await SalesManager.findById(id).lean().exec()
  if (!salesManager) {
    return res.status(400).json({ message: "Sales manager not found" })
  }
  res.json(salesManager)
}

// @desc Create new salesManager
// @route POST /salesManagers
// @access Private
const createNewSalesManager = async (req, res) => {
  const { name, email, phone } = req.body
  let failed = false
  const message = {}
  const salesManager = {}

  if (typeof name === "string" && name) {
    salesManager.name = name
  } else {
    failed = true
    message.name = "Name is required"
  }
  if (typeof email === "string" && email) {
    salesManager.email = email
  } else {
    failed = true
    message.email = "Email is required"
  }
  if (typeof phone === "string" && phone) {
    salesManager.phone = phone
  } else {
    failed = true
    message.phone = "Phone number is required"
  }

  if (failed) {
    return res.status(400).json(message)
  }

  const newSM = await SalesManager.create(salesManager)
  if (newSM) {
    res.status(201).json({ message: `New sales manager ${name} created` })
  } else {
    res.status(400).json({ message: "Invalid sales manager data recieved" })
  }
}

// @desc Update a salesManager
// @route PUT /salesManagers/:id
// @access Private
const updateSalesManager = async (req, res) => {
  const { name, email, phone } = req.body
  const id = req.params.id
  let failed = false
  const message = {}

  const salesManager = await SalesManager.findById(id)
  if (!salesManager) {
    return res.status(400).json({ message: "Sales manager not found" })
  }

  if (typeof name === "string" && name) {
    salesManager.name = name
  } else {
    failed = true
    message.name = "Name is required"
  }
  if (typeof email === "string" && email) {
    salesManager.email = email
  } else {
    failed = true
    message.email = "Email is required"
  }
  if (typeof phone === "string" && phone) {
    salesManager.phone = phone
  } else {
    failed = true
    message.phone = "Phone number is required"
  }

  if (failed) {
    return res.status(400).json(message)
  }
  await salesManager.save()
  res.json({ message: `updated sales manager with id ${id}` })
}

// @desc Delete a salesManager
// @route DELETE /salesManagers/:id
// @access Private
const deleteSalesManager = async (req, res) => {
  const id = req.params.id
  const salesManager = await SalesManager.findById(id).exec()

  if (!salesManager) {
    return res.status(400).json({ message: "salesManager not found" })
  }

  await salesManager.deleteOne()
  res.json({ message: `deleted salesManager with id ${id}` })
}

module.exports = {
  getAllSalesManagers,
  getSalesManager,
  createNewSalesManager,
  updateSalesManager,
  deleteSalesManager,
}
