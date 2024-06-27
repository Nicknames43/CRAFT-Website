const User = require("../models/User")
const bcrypt = require("bcrypt")

// @desc Get all users
// @route GET /users
// @access Private
const getAllUsers = async (req, res) => {
  const users = await User.find().select("-password").lean()
  if (!users?.length) {
    return res.status(400).json({ message: "No users found" })
  }
  res.json(users)
}

// @desc Get individual user
// @route GET /users/:id
// @access Private
const getUser = async (req, res) => {
  const id = req.params.id
  const user = await User.findById(id)
    .select("-password")
    .lean()
    .exec()
  if (!user) {
    return res.status(400).json({ message: "User not found" })
  }
  res.json(user)
}

// @desc Create new user
// @route POST /users
// @access Private
const createNewUser = async (req, res) => {
  const { username, password, admin } = req.body

  if (!username || !password) {
    return res.status(400).json({ message: "All fields are required" })
  }

  const duplicate = await User.findOne({ username })
    .collation({ locale: "en", strength: 2 })
    .lean()
    .exec()
  if (duplicate) {
    return res.status(409).json({ message: "Username already exists" })
  }

  const hashedPwd = await bcrypt.hash(password, 10) // 10 salt rounds
  const newUser =
    typeof admin === "boolean"
      ? { username, password: hashedPwd, admin }
      : { username, password: hashedPwd }
  const user = await User.create(newUser)
  if (user) {
    res.status(201).json({ message: `New user ${username} created` })
  } else {
    res.status(400).json({ message: "Invalid user data recieved" })
  }
}

// @desc Update a user
// @route PUT /users/:id
// @access Private
const updateUser = async (req, res) => {
  const id = req.params.id
  const { username, password, admin } = req.body

  if (!username || typeof admin === "boolean") {
    return res
      .status(400)
      .json({ message: "All fields except password are required" })
  }

  const user = await User.findById(id).exec()
  if (!user) {
    return res.status(400).json({ message: "user not found" })
  }

  if (username) {
    const duplicate = await User.findOne({ username })
      .collation({ locale: "en", strength: 2 })
      .lean()
      .exec()
    if (duplicate && duplicate?._id.toString() !== id) {
      return res.status(400).json({ message: "username already exists" })
    }
    user.username = username
  }

  user.admin = admin

  if (password) {
    user.password = await bcrypt.hash(password, 10) // 10 salt rounds
  }

  await user.save()

  res.json({ message: `updated user with id ${id}` })
}

// @desc Delete a user
// @route DELETE /users/:id
// @access Private
const deleteUser = async (req, res) => {
  const id = req.params.id
  const user = await User.findById(id).exec()

  if (!user) {
    return res.status(400).json({ message: "user not found" })
  }

  await user.deleteOne()
  res.json({message: `deleted user with id ${id}`})
}

module.exports = { getAllUsers, getUser, createNewUser, updateUser, deleteUser }
