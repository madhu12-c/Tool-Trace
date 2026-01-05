const Site = require("../models/Site");

const createSite = async (req, res) => {
  try {
    const site = await Site.create(req.body);
    res.status(201).json(site);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getSites = async (req, res) => {
  try {
    const { contractorId } = req.query;
    const sites = await Site.find({ contractorId });
    res.json(sites);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createSite, getSites };
