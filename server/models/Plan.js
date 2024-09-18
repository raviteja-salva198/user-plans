// models/Plan.js
const mongoose = require('mongoose');

const PlanSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  planName: { type: String, required: true },
  time: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Plan', PlanSchema);
