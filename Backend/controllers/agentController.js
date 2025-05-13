const Agent = require('../models/agentModel');
const jwt = require('jsonwebtoken');

// Generate JWT for agent
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// @desc    Create a new agent
// @route   POST /api/agents
// @access  Private/Admin
const createAgent = async (req, res) => {
  const { name, email, mobileNumber, password } = req.body;

  const agentExists = await Agent.findOne({ email });

  if (agentExists) {
    res.status(400);
    throw new Error('Agent already exists');
  }

  const agent = await Agent.create({
    name,
    email,
    mobileNumber,
    password,
    createdBy: req.user._id,
  });

  if (agent) {
    res.status(201).json({
      _id: agent._id,
      name: agent.name,
      email: agent.email,
      mobileNumber: agent.mobileNumber,
    });
  } else {
    res.status(400);
    throw new Error('Invalid agent data');
  }
};

// @desc    Get all agents
// @route   GET /api/agents
// @access  Private/Admin
const getAgents = async (req, res) => {
  const agents = await Agent.find({ createdBy: req.user._id });
  res.json(agents);
};

// @desc    Get agent by ID
// @route   GET /api/agents/:id
// @access  Private/Admin
const getAgentById = async (req, res) => {
  const agent = await Agent.findById(req.params.id).select('-password');

  if (agent) {
    res.json(agent);
  } else {
    res.status(404);
    throw new Error('Agent not found');
  }
};

// @desc    Update agent
// @route   PUT /api/agents/:id
// @access  Private/Admin
const updateAgent = async (req, res) => {
  const agent = await Agent.findById(req.params.id);

  if (agent) {
    agent.name = req.body.name || agent.name;
    agent.email = req.body.email || agent.email;
    agent.mobileNumber = req.body.mobileNumber || agent.mobileNumber;

    if (req.body.password) {
      agent.password = req.body.password;
    }

    const updatedAgent = await agent.save();

    res.json({
      _id: updatedAgent._id,
      name: updatedAgent.name,
      email: updatedAgent.email,
      mobileNumber: updatedAgent.mobileNumber,
    });
  } else {
    res.status(404);
    throw new Error('Agent not found');
  }
};

// @desc    Delete agent
// @route   DELETE /api/agents/:id
// @access  Private/Admin
const deleteAgent = async (req, res) => {
  const agent = await Agent.findById(req.params.id);

  if (agent) {
    await agent.deleteOne();
    res.json({ message: 'Agent removed' });
  } else {
    res.status(404);
    throw new Error('Agent not found');
  }
};

// @desc    Auth agent & get token
// @route   POST /api/agents/login
// @access  Public
const authAgent = async (req, res) => {
  const { email, password } = req.body;

  const agent = await Agent.findOne({ email });

  if (agent && (await agent.matchPassword(password))) {
    res.json({
      _id: agent._id,
      name: agent.name,
      email: agent.email,
      mobileNumber: agent.mobileNumber,
      token: generateToken(agent._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
};

module.exports = {
  createAgent,
  getAgents,
  getAgentById,
  updateAgent,
  deleteAgent,
  authAgent,
};
