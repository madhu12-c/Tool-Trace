const express = require("express");
const { createUser, getSiteManagers, updateUser, deleteUser } = require("../controllers/userController");

const router = express.Router();

router.post("/", createUser);
router.get("/site-managers", getSiteManagers);
router.patch("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;

