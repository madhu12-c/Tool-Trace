const express = require("express");
const { createTool , getToolsBySite , updateToolStatus, transferTool,getToolById} = require("../controllers/toolController");

const router = express.Router();

router.post("/", createTool);
router.get("/", getToolsBySite);
router.get("/:id", getToolById);
router.patch("/:id/status", updateToolStatus);
router.patch("/:id/transfer", transferTool);

module.exports = router;
