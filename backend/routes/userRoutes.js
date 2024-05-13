const express = require("express")
const router = express.Router()
const userController = require("../controllers/userController")
const verifyJWT = require("../middleware/verifyJWT")

router.use(verifyJWT)
router
  .route("/")
  .get(userController.getAllUsers)
  .post(userController.createNewUser)
router
  .route("/:username")
  .get(userController.getUser)
  .put(userController.updateUser)
  .delete(userController.deleteUser)

module.exports = router
