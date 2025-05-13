const Contact = require('../models/contactModel');
const Agent = require('../models/agentModel');
const fs = require('fs');
const csv = require('csv-parser');
const xlsx = require('xlsx');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// @desc    Upload and distribute contacts
// @route   POST /api/contacts/upload
// @access  Private/Admin
const uploadContacts = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Please upload a file' });
    }

    // Check file extension
    const fileExtension = path.extname(req.file.originalname).toLowerCase();
    if (!['.csv', '.xlsx', '.xls'].includes(fileExtension)) {
      return res.status(400).json({
        message: 'Invalid file format. Only CSV, XLSX, and XLS files are allowed',
      });
    }

    // Get all agents
    const agents = await Agent.find({ createdBy: req.user._id });
    
    if (agents.length === 0) {
      return res.status(400).json({
        message: 'No agents found. Please add agents before uploading contacts',
      });
    }

    const contacts = [];
    const batchId = uuidv4(); // Generate a unique batch ID

    // Parse file based on extension
    if (fileExtension === '.csv') {
      // Parse CSV file
      await new Promise((resolve, reject) => {
        fs.createReadStream(req.file.path)
          .pipe(csv())
          .on('data', (row) => {
            if (row.FirstName && row.Phone) {
              contacts.push({
                firstName: row.FirstName,
                phone: row.Phone,
                notes: row.Notes || '',
              });
            }
          })
          .on('end', resolve)
          .on('error', reject);
      });
    } else {
      // Parse Excel file
      const workbook = xlsx.readFile(req.file.path);
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const data = xlsx.utils.sheet_to_json(worksheet);

      data.forEach((row) => {
        if (row.FirstName && row.Phone) {
          contacts.push({
            firstName: row.FirstName,
            phone: row.Phone,
            notes: row.Notes || '',
          });
        }
      });
    }

    // Delete the file after processing
    fs.unlinkSync(req.file.path);

    if (contacts.length === 0) {
      return res.status(400).json({
        message: 'No valid contacts found in the file. Please check the file format',
      });
    }

    // Distribute contacts among agents
    const distributedContacts = distributeContacts(contacts, agents, req.user._id, batchId);

    // Save contacts to database
    await Contact.insertMany(distributedContacts);

    res.status(201).json({
      message: `${contacts.length} contacts uploaded and distributed successfully`,
      batchId,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error during file upload' });
  }
};

// Helper function to distribute contacts among agents
const distributeContacts = (contacts, agents, userId, batchId) => {
  const agentCount = agents.length;
  const distributedContacts = [];

  contacts.forEach((contact, index) => {
    const agentIndex = index % agentCount;
    distributedContacts.push({
      ...contact,
      assignedTo: agents[agentIndex]._id,
      uploadedBy: userId,
      batchId,
    });
  });

  return distributedContacts;
};

// @desc    Get contacts for a specific agent
// @route   GET /api/contacts/agent/:agentId
// @access  Private/Admin
const getAgentContacts = async (req, res) => {
  const contacts = await Contact.find({ assignedTo: req.params.agentId })
    .sort({ createdAt: -1 });
  
  res.json(contacts);
};

// @desc    Get contacts for the logged-in agent
// @route   GET /api/contacts/my-contacts
// @access  Private/Agent
const getMyContacts = async (req, res) => {
  const contacts = await Contact.find({ assignedTo: req.agent._id })
    .sort({ createdAt: -1 });
  
  res.json(contacts);
};

// @desc    Get all contacts by batch
// @route   GET /api/contacts/batch/:batchId
// @access  Private/Admin
const getContactsByBatch = async (req, res) => {
  const contacts = await Contact.find({ 
    batchId: req.params.batchId,
    uploadedBy: req.user._id 
  }).populate('assignedTo', 'name email');
  
  res.json(contacts);
};

module.exports = {
  uploadContacts,
  getAgentContacts,
  getMyContacts,
  getContactsByBatch,
};
