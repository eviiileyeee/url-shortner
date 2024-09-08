const express = require("express");
const router = express.Router();
const { handleGenerateNewShortURl, handleGetAnalytics} = require('../controllers/url.js')

router.post("/", handleGenerateNewShortURl);

router.get("/analytics/:shortId",handleGetAnalytics)

module.exports = router;