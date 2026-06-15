const express = require('express');
const router = express.Router();
const { analyzeCrop, getDiseases } = require('../controllers/detectionController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/upload');

router.post('/analyze', protect, upload.single('image'), analyzeCrop);
router.get('/diseases', getDiseases);

module.exports = router;
