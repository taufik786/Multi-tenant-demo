const mongoose = require('mongoose');
const { Schema, Types } = mongoose;

const RouteSchema = new Schema({
  orgId: {
    type: Types.ObjectId,
    required: true,
    ref: 'organizations'
  },
  parent: {
    type: String,
    required: true
  },
  children: [
    {
      child: {
        type: String,
        required: true
      },
      subchildren: {
        type: [String],
        default: []
      }
    }
  ]
});

module.exports = mongoose.model('routes', RouteSchema);
