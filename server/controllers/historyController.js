const Prediction = require('../models/Prediction');

// @desc    Get prediction history for current user
// @route   GET /api/history
exports.getHistory = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const filter = { userId: req.user._id };

    // Optional filters
    if (req.query.status) filter.status = req.query.status;
    if (req.query.crop) filter.cropName = new RegExp(req.query.crop, 'i');

    const total = await Prediction.countDocuments(filter);
    const predictions = await Prediction.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    // Add image URL prefix
    const data = predictions.map(p => ({
      ...p,
      imagePath: `/uploads/${p.imagePath}`
    }));

    res.json({
      success: true,
      data,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get aggregate stats for dashboard
// @route   GET /api/history/stats
exports.getStats = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const totalScans = await Prediction.countDocuments({ userId });
    const diseasedCount = await Prediction.countDocuments({ userId, status: 'diseased' });
    const healthyCount = await Prediction.countDocuments({ userId, status: 'healthy' });

    // Disease distribution
    const diseaseDistribution = await Prediction.aggregate([
      { $match: { userId, status: 'diseased' } },
      { $group: { _id: '$disease', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ]);

    // Monthly scan trend (last 6 months)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const scanTrend = await Prediction.aggregate([
      { $match: { userId, createdAt: { $gte: sixMonthsAgo } } },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          total: { $sum: 1 },
          diseased: { $sum: { $cond: [{ $eq: ['$status', 'diseased'] }, 1, 0] } },
          healthy: { $sum: { $cond: [{ $eq: ['$status', 'healthy'] }, 1, 0] } }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } }
    ]);

    // Last scan
    const lastScan = await Prediction.findOne({ userId })
      .sort({ createdAt: -1 })
      .lean();

    res.json({
      success: true,
      data: {
        totalScans,
        diseasedCount,
        healthyCount,
        healthRate: totalScans > 0 ? Math.round((healthyCount / totalScans) * 100) : 0,
        diseaseDistribution: diseaseDistribution.map(d => ({
          disease: d._id,
          count: d.count
        })),
        scanTrend: scanTrend.map(s => ({
          month: `${s._id.year}-${String(s._id.month).padStart(2, '0')}`,
          total: s.total,
          diseased: s.diseased,
          healthy: s.healthy
        })),
        lastScan: lastScan ? {
          disease: lastScan.disease,
          crop: lastScan.cropName,
          date: lastScan.createdAt
        } : null
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single prediction
// @route   GET /api/history/:id
exports.getPrediction = async (req, res, next) => {
  try {
    const prediction = await Prediction.findOne({
      _id: req.params.id,
      userId: req.user._id
    }).lean();

    if (!prediction) {
      return res.status(404).json({ success: false, message: 'Prediction not found' });
    }

    res.json({
      success: true,
      data: {
        ...prediction,
        imagePath: `/uploads/${prediction.imagePath}`
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete prediction
// @route   DELETE /api/history/:id
exports.deletePrediction = async (req, res, next) => {
  try {
    const prediction = await Prediction.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!prediction) {
      return res.status(404).json({ success: false, message: 'Prediction not found' });
    }

    res.json({ success: true, message: 'Prediction deleted' });
  } catch (error) {
    next(error);
  }
};
