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

exports.addRoutes = async(req, res) => {
  console.log("Request body:", req.body);
  try {
    const newRoute = new routesModel(req.body);
    const savedRoute = await newRoute.save();
    res.status(201).json(savedRoute);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create route', details: error.message });
  }
};
