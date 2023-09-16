//utformet av mohammed fawzi mohammed - kandidatnr: 6000
const express = require("express");
const multer = require("multer");
const router = express.Router();
const upload = multer();
const { addData,getData,downlod } = require("../controllers/tellelister.controller");



router.post("/add", upload.single("file"), addData);
router.get("/getData", getData);
router.get('/download/:id', downlod);



module.exports = router;
