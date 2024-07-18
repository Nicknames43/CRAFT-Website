const express = require("express")
const router = express.Router()
const salesManagerController = require("../controllers/salesManagerController")
const verifyJWT = require("../middleware/verifyJWT")

router
  .route("/")
  .get(salesManagerController.getAllSalesManagers)
  .post(verifyJWT, salesManagerController.createNewSalesManager)
router
  .route("/:id")
  .get(salesManagerController.getSalesManager)
  .put(verifyJWT, salesManagerController.updateSalesManager)
  .delete(verifyJWT, salesManagerController.deleteSalesManager)

module.exports = router
