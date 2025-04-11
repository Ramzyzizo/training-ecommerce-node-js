const express = require("express");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); 
  },
});

const upload = multer({ storage});

const router = express.Router();
// router.post("/", upload.single("CV"), (req, res) => {
router.post("/", upload.array("CVs"), (req, res) => {
  console.log("File:", req.files);
  console.log("Body:", req.body);
  res.send("upload route run successfully");
});

module.exports = router;
