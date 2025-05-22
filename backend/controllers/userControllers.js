const mongoose = require("mongoose");
const userModels = require("../models/userModels");
const organizationsModel = require("../models/organizationsModel");
const routesModel = require("../models/routesModel");

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Check if user exists
    const user = await userModels.find({ email: email }).select("+password").exec();
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};
exports.layout = async (req, res) => {
    try {
        let orgName = req.params.orgName ?? "org3";
    const organizations = await organizationsModel.findOne({name: orgName})
    const routes = await routesModel.find({orgId:organizations._id}).populate("orgId").exec();
    // console.log('Organizations:', routes);

    res.status(200).json({ message: "Success", routes: routes });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.addRoutes = async (req, res) => {
  console.log("Request body:", req.body);

  try {
    // Validate input is an array
    if (!Array.isArray(req.body)) {
      return res.status(400).json({ error: 'Expected an array of route objects' });
    }

    // Insert multiple documents
    const savedRoutes = await routesModel.insertMany(req.body);
    res.status(201).json(savedRoutes);
  } catch (error) {
    console.error("Insert error:", error);
    res.status(400).json({ error: 'Failed to insert routes', details: error.message });
  }
};

