const express = require("express");
const { createSite } = require("../controllers/siteController");

const router = express.Router();

router.post("/", createSite);

module.exports = router;
