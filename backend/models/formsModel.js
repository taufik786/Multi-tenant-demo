// models/Form.js
const mongoose = require('mongoose');

const FieldSchema = new mongoose.Schema({
  label: String,
  name: String,
  type: String, // e.g., text, number, select
  required: Boolean,
  options: [String], // For select/dropdown
});

const FormSchema = new mongoose.Schema({
  orgId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'organizations',
  },
  formName: String,
  fields: [FieldSchema],
});

module.exports = mongoose.model('forms', FormSchema);
