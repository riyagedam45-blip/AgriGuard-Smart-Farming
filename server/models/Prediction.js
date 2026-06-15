const mongoose = require('mongoose');

const predictionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  imagePath: {
    type: String,
    required: true
  },
  cropName: {
    type: String,
    required: true
  },
  disease: {
    type: String,
    required: true
  },
  confidence: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  status: {
    type: String,
    enum: ['healthy', 'diseased'],
    required: true
  },
  treatment: {
    description: String,
    steps: [String],
    prevention: [String],
    organicAlternatives: [String]
  },
  severity: {
    type: String,
    enum: ['none', 'low', 'medium', 'high', 'critical'],
    default: 'none'
  }
}, {
  timestamps: true
});

// Index for efficient user history queries
predictionSchema.index({ userId: 1, createdAt: -1 });

module.exports = mongoose.model('Prediction', predictionSchema);
