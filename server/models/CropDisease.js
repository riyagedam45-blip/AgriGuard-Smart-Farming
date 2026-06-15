const mongoose = require('mongoose');

const cropDiseaseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  crop: {
    type: String,
    required: true
  },
  symptoms: [String],
  treatment: {
    description: String,
    steps: [String]
  },
  severity: {
    type: String,
    enum: ['low', 'medium', 'high', 'critical'],
    default: 'medium'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('CropDisease', cropDiseaseSchema);
