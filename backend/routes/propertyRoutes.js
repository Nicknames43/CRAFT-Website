const express = require("express")
const router = express.Router()
const propertyController = require("../controllers/propertyController")
const verifyJWT = require("../middleware/verifyJWT")

router
  .route("/")
  .get(propertyController.getAllProperties)
  .post(verifyJWT, propertyController.createNewProperty)
router
  .route("/:id")
  .get(propertyController.getProperty)
  .put(verifyJWT, propertyController.updateProperty)
  .delete(verifyJWT, propertyController.deleteProperty)

module.exports = router
