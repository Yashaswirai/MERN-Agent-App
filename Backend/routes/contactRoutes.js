const express = require('express');
const router = express.Router();
const {
  uploadContacts,
  getAgentContacts,
  getMyContacts,
  getContactsByBatch,
} = require('../controllers/contactController');
const { protect, protectAgent } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');
const fs = require('fs');
const path = require('path');

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

router.post('/upload', protect, upload.single('file'), uploadContacts);
router.get('/agent/:agentId', protect, getAgentContacts);
router.get('/my-contacts', protectAgent, getMyContacts);
router.get('/batch/:batchId', protect, getContactsByBatch);

module.exports = router;
