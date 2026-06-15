const Prediction = require('../models/Prediction');
const { analyzeImage } = require('../services/aiService');
const { getTreatment, getAllTreatments } = require('../services/treatmentService');

// @desc    Analyze crop image for disease
// @route   POST /api/detect/analyze
exports.analyzeCrop = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Please upload an image' });
    }

    const imagePath = req.file.filename;

    // Run AI analysis
    const aiResult = await analyzeImage(req.file.path);
    const { primaryPrediction } = aiResult;

    // Get treatment recommendation
    const treatment = getTreatment(primaryPrediction.disease);

    // Save prediction to database
    const prediction = await Prediction.create({
      userId: req.user._id,
      imagePath,
      cropName: primaryPrediction.crop,
      disease: primaryPrediction.disease,
      confidence: primaryPrediction.confidence,
      status: primaryPrediction.status,
      severity: treatment.severity,
      treatment: {
        description: treatment.description,
        steps: treatment.steps,
        prevention: treatment.prevention,
        organicAlternatives: treatment.organicAlternatives
      }
    });

    res.status(201).json({
      success: true,
      data: {
        prediction: {
          id: prediction._id,
          imagePath: `/uploads/${imagePath}`,
          cropName: primaryPrediction.crop,
          disease: primaryPrediction.disease,
          confidence: primaryPrediction.confidence,
          status: primaryPrediction.status,
          severity: treatment.severity,
          createdAt: prediction.createdAt
        },
        treatment: {
          description: treatment.description,
          steps: treatment.steps,
          prevention: treatment.prevention,
          organicAlternatives: treatment.organicAlternatives
        },
        secondaryPredictions: aiResult.secondaryPredictions,
        processingTime: aiResult.processingTime,
        modelVersion: aiResult.modelVersion
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all known diseases
// @route   GET /api/detect/diseases
exports.getDiseases = async (req, res, next) => {
  try {
    const diseases = getAllTreatments();
    res.json({ success: true, data: diseases });
  } catch (error) {
    next(error);
  }
};
