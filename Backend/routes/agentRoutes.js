const express = require('express');
const router = express.Router();
const {
  createAgent,
  getAgents,
  getAgentById,
  updateAgent,
  deleteAgent,
  authAgent,
} = require('../controllers/agentController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/').post(protect, createAgent).get(protect, getAgents);
router.post('/login', authAgent);
router
  .route('/:id')
  .get(protect, getAgentById)
  .put(protect, updateAgent)
  .delete(protect, deleteAgent);

module.exports = router;
