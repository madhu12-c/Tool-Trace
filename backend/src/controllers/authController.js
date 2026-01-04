const User = require("../models/User");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email, password });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.json({
      role: user.role,
      contractorId: user.contractorId,
      siteId: user.siteId,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { login };
