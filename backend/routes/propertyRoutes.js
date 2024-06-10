const express = require("express")
const router = express.Router()
const propertyController = require("../controllers/propertyController")
const verifyJWT = require("../middleware/verifyJWT")
const multer = require("multer")
const path = require("path")

const storage = multer.diskStorage({
  destination: (req, file, cb) =>
    cb(null, path.join(__dirname, "../", "/uploads")), // cb -> callback
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname)
    const name = path.basename(file.originalname, ext)
    const uniqueName = `${name}${Date.now()}-${Math.round(
      Math.random() * 1e6
    )}${ext}`
    cb(null, uniqueName)
  },
})
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "image/png" || file.mimetype === "image/jpeg") {
      cb(null, true)
    } else {
      cb(null, false) //possibly throw an error instead of null here
    }
  },
})

router
  .route("/")
  .get(propertyController.getAllProperties)
  .post(verifyJWT, upload.array("images"), propertyController.createNewProperty)
router
  .route("/:id")
  .get(propertyController.getProperty)
  .put(verifyJWT, upload.array("newImages"), propertyController.updateProperty)
  .delete(verifyJWT, propertyController.deleteProperty)

module.exports = router
