const Tool = require("../models/Tool");

const createTool = async (req, res) => {
  try {
    const tool = await Tool.create(req.body);
    res.status(201).json(tool);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
const getToolsBySite = async (req, res) => {  
  try{
  const { siteId, contractorId, status } = req.query;
  let query = {};
  if (siteId) query.siteId = siteId;
  if (contractorId) query.contractorId = contractorId;
  if (status) query.status = status;
  const tools = await Tool.find(query).populate('siteId', 'siteName').populate('requestedSiteId', 'siteName').populate('requestedBy', 'name');
  res.json(tools);
  }
  catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getToolById = async (req, res) => {
  try {
    const tool = await Tool.findById(req.params.id);

    if (!tool) {
      return res.status(404).json({ message: "Tool not found" });
    }

    res.json(tool);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
const updateToolStatus = async (req, res) => {
  try {
    console.log("PATCH BODY:", req.body);
    console.log("TOOL ID:", req.params.id);

    const { status, siteId, requestedSiteId, requestedBy, reason } = req.body;

    const updateData = {};
    if (status) updateData.status = status;
    if (siteId !== undefined) updateData.siteId = siteId;
    if (requestedSiteId !== undefined) updateData.requestedSiteId = requestedSiteId;
    if (requestedBy !== undefined) updateData.requestedBy = requestedBy;
    if (reason !== undefined) updateData.reason = reason;

    const tool = await Tool.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    ).populate('siteId', 'siteName').populate('requestedSiteId', 'siteName').populate('requestedBy', 'name');

    res.json(tool);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
const transferTool = async (req, res) => {
  try {
    const { siteId } = req.body;

    const tool = await Tool.findByIdAndUpdate(
      req.params.id,
      { siteId },
      { new: true }
    );

    res.json(tool);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { createTool , getToolsBySite , updateToolStatus , transferTool ,getToolById
 };
