const router = require("express").Router();

const { login, layout, addRoutes } = require("../controllers/userControllers");
const formsModel = require("../models/formsModel");

router.route("/login").get(login);
router.route("/layout/:orgName").get(layout);
router.route("/routes").post(addRoutes);

router.post('/create-form', async (req, res) => {
  try {
    const form = new formsModel(req.body);
    const saved = await form.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/get-form/:orgId', async (req, res) => {
  try {
    const form = await formsModel.findOne({ orgId: req.params.orgId });
    res.json(form);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


module.exports = router;
