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
  const { siteId } = req.query;
  const tools = await Tool.find({ siteId });
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

    const { status } = req.body;

    const tool = await Tool.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

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
