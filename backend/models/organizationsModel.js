const mongoose = require('mongoose');
const { Schema, Types } = mongoose;

const organizations = new Schema({
  name: {
    type: String,
    required: true
  },

});

module.exports = mongoose.model('organizations', organizations);
