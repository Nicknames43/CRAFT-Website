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

// @desc Get all users
// @route GET /users/:username
// @access Private
const getUser = async (req, res) => {
  const username = req.params.username
  const user = await User.findOne({ username: username })
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
  const { username, password, roles } = req.body

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
    !Array.isArray(roles) || !roles.length
      ? { username, password: hashedPwd }
      : { username, password: hashedPwd, roles }
  const user = await User.create(newUser)
  if (user) {
    res.status(201).json({ message: `New user ${username} created` })
  } else {
    res.status(400).json({ message: "Invalid user data recieved" })
  }
}

// @desc Update a user
// @route PATCH /users/:username
// @access Private
const updateUser = async (req, res) => {
  const username = req.params.username
  const { password, roles } = req.body

  if (!username || !Array.isArray(roles) || !roles.length) {
    return res
      .status(400)
      .json({ message: "All fields except password are required" })
  }

  const user = await User.findOne({ username: username }).exec()

  if (!user) {
    return res.status(400).json({ message: "user not found" })
  }

  user.roles = roles

  if (password) {
    user.password = await bcrypt.hash(password, 10) // 10 salt rounds
  }

  const updatedUser = await user.save()

  res.json({ message: `${updatedUser.username} updated` })
}

// @desc Delete a user
// @route DELETE /users/:username
// @access Private
const deleteUser = async (req, res) => {
  const username = req.params.username
  const user = await User.findOne({ username: username }).exec()

  if (!user) {
    return res.status(400).json({ message: "user not found" })
  }

  const result = await user.deleteOne()
  const reply = `Username ${result.username} with ID ${result._id} deleted`
  res.json(reply)
}

module.exports = { getAllUsers, getUser, createNewUser, updateUser, deleteUser }
