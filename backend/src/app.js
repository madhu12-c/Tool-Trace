const express = require("express");
const cors = require("cors");

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// health check
app.get("/", (req, res) => {
  res.send("ToolTrace backend running");
});

module.exports = app;
const authRoutes = require("./routes/authRoutes");
const siteRoutes = require("./routes/siteRoutes");
const toolRoutes = require("./routes/toolRoutes");
const userRoutes = require("./routes/userRoutes");
app.use("/auth", authRoutes);
app.use("/sites", siteRoutes);
app.use("/tools", toolRoutes);
app.use("/users", userRoutes);
