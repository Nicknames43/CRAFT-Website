const express = require("express")
const router = express.Router()
const verifyJWT = require("../middleware/verifyJWT")

router.use(verifyJWT) //propbably change (apply to specific instead of all) -------------------------------------------
router.route("/").get().post().patch().delete()

module.exports = router
