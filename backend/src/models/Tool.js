const mongoose = require("mongoose");

const toolSchema = new mongoose.Schema(
  {
    toolName: {
      type: String,
      required: true,
    },
    serialNo: {
      type: String,
      required: true,
        unique: true,
    },
     purchasedFrom: {
      type: String,
    },
    purchasedSite: {
      type: String,
    },
    status: {
      type: String,
      enum: ["active", "idle", "maintenance"],
      default: "idle",
    },
    siteId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Site",
      required: true,
    },
    contractorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Tool", toolSchema);
