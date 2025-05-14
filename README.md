# MERN Agent Management Application

A full-stack MERN (MongoDB, Express, React, Node.js) application for managing agents and distributing contacts among them.

## Demo Video

[![Agent Management System Demo](https://img.shields.io/badge/Watch-Demo%20Video-red)](https://drive.google.com/file/d/1Xa6rEJAnESLlbGo8AFOncVff_GVB1aHA/view?usp=drive_link)

Check out the [demo video](https://drive.google.com/file/d/1Xa6rEJAnESLlbGo8AFOncVff_GVB1aHA/view?usp=drive_link) to see the Agent Management System in action. The video showcases the key features and functionality of the application, including:

- User authentication and registration
- Agent management (adding, editing, viewing agents)
- CSV file upload and contact distribution
- Viewing distribution results

## Features

1. **User Authentication**
   - JWT-based authentication
   - User registration and login

2. **Agent Management**
   - Add, edit, and delete agents
   - View agent details

3. **CSV Upload and Distribution**
   - Upload CSV, XLSX, or XLS files
   - Distribute contacts equally among agents
   - View distribution results

## Tech Stack

### Backend
- Node.js with Express
- MongoDB with Mongoose
- JWT for authentication
- Multer for file uploads
- CSV and Excel parsing

### Frontend
- React with Vite
- Redux Toolkit for state management
- React Router for navigation
- Tailwind CSS for styling
- Axios for API requests

## Getting Started

### Prerequisites
- Node.js
- MongoDB

### Installation

1. Clone the repository
2. Install backend dependencies:
   ```
   cd Backend
   npm install
   ```
3. Install frontend dependencies:
   ```
   cd Frontend
   npm install
   ```

### Running the Application

1. Start the backend server:
   ```
   cd Backend
   npm start
   ```
2. Start the frontend development server:
   ```
   cd Frontend
   npm run dev
   ```

## API Endpoints

### Authentication
- POST /api/users/login - User login
- POST /api/users - User registration
- GET /api/users/profile - Get user profile

### Agents
- GET /api/agents - Get all agents
- POST /api/agents - Create a new agent
- GET /api/agents/:id - Get agent by ID
- PUT /api/agents/:id - Update agent
- DELETE /api/agents/:id - Delete agent

### Contacts
- POST /api/contacts/upload - Upload and distribute contacts
- GET /api/contacts/agent/:agentId - Get contacts for a specific agent
- GET /api/contacts/batch/:batchId - Get contacts by batch ID

## Project Structure

```
mern-agent-app/
├── Backend/                # Node.js & Express backend
│   ├── config/             # Configuration files
│   ├── controllers/        # Request handlers
│   ├── middleware/         # Custom middleware
│   ├── models/             # Mongoose models
│   ├── routes/             # API routes
│   ├── uploads/            # Uploaded files (temporary)
│   ├── .env                # Environment variables
│   ├── package.json        # Backend dependencies
│   └── server.js           # Entry point
│
├── Frontend/               # React & Vite frontend
│   ├── public/             # Static assets
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── redux/          # Redux state management
│   │   ├── screens/        # Page components
│   │   ├── utils/          # Utility functions
│   │   ├── App.jsx         # Main component
│   │   ├── index.css       # Global styles
│   │   └── main.jsx        # Entry point
│   ├── .env                # Environment variables
│   ├── index.html          # HTML template
│   ├── package.json        # Frontend dependencies
│   └── vite.config.js      # Vite configuration
│
└── README.md               # Project documentation
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Acknowledgments

- Thanks to all the open-source libraries that made this project possible
- Special thanks to the MERN stack community for their excellent documentation and resources
