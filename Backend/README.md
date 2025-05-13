# Agent Management System - Backend API

This is the backend API for the Agent Management System, a MERN application that allows users to manage agents and distribute CSV data among them. The system provides user authentication, agent management, and a mechanism to upload and distribute contact data from CSV/Excel files equally among agents.

## Features

- **User Authentication** - Secure login and registration with JWT
- **Agent Management** - CRUD operations for managing agents
- **CSV/Excel Upload** - Support for uploading contact data
- **Data Distribution** - Automatic distribution of contacts among agents
- **API Security** - Protected routes and role-based access control
- **Error Handling** - Comprehensive error handling and validation

## Table of Contents

- [Technologies](#technologies)
- [Project Structure](#project-structure)
- [Setup and Installation](#setup-and-installation)
- [Environment Variables](#environment-variables)
- [Database Models](#database-models)
- [API Endpoints](#api-endpoints)
- [Authentication](#authentication)
- [File Upload](#file-upload)
- [Data Distribution Algorithm](#data-distribution-algorithm)
- [Error Handling](#error-handling)
- [Middleware](#middleware)

## Technologies

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **Bcrypt.js** - Password hashing
- **Multer** - File upload handling
- **CSV-Parser** - CSV file parsing
- **XLSX** - Excel file parsing

## Project Structure

```
Backend/
├── config/             # Configuration files
│   └── db.js           # Database connection
├── controllers/        # Request handlers
│   ├── userController.js
│   ├── agentController.js
│   └── contactController.js
├── middleware/         # Custom middleware
│   ├── authMiddleware.js
│   ├── errorMiddleware.js
│   └── uploadMiddleware.js
├── models/             # Database models
│   ├── userModel.js
│   ├── agentModel.js
│   └── contactModel.js
├── routes/             # API routes
│   ├── userRoutes.js
│   ├── agentRoutes.js
│   └── contactRoutes.js
├── uploads/            # Uploaded files (temporary storage)
├── .env                # Environment variables
├── package.json        # Project dependencies
└── server.js           # Entry point
```

## Setup and Installation

1. **Clone the repository**

```bash
git clone <repository-url>
cd Backend
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

Create a `.env` file in the root of the Backend directory with the following variables:

```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/agent-app
JWT_SECRET=your_jwt_secret_key
```

4. **Start the server**

```bash
# Development mode
npm run dev

# Production mode
npm start
```

## Environment Variables

- `PORT` - The port on which the server will run (default: 3000)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT token generation and verification

## Database Models

### User Model

```javascript
{
  name: String,          // User's name
  email: String,         // User's email (unique)
  password: String,      // Hashed password
  isAdmin: Boolean,      // Admin status
  createdAt: Date,       // Timestamp
  updatedAt: Date        // Timestamp
}
```

### Agent Model

```javascript
{
  name: String,          // Agent's name
  email: String,         // Agent's email (unique)
  mobileNumber: String,  // Agent's mobile number with country code
  password: String,      // Hashed password
  createdBy: ObjectId,   // Reference to User who created the agent
  createdAt: Date,       // Timestamp
  updatedAt: Date        // Timestamp
}
```

### Contact Model

```javascript
{
  firstName: String,     // Contact's first name
  phone: String,         // Contact's phone number
  notes: String,         // Additional notes
  assignedTo: ObjectId,  // Reference to Agent
  uploadedBy: ObjectId,  // Reference to User who uploaded the contact
  batchId: String,       // Batch ID for grouping contacts from same upload
  createdAt: Date,       // Timestamp
  updatedAt: Date        // Timestamp
}
```

## API Endpoints

### Authentication

- `POST /api/users/login` - User login
- `POST /api/users` - User registration
- `GET /api/users/profile` - Get user profile (protected)

### Agents

- `GET /api/agents` - Get all agents (protected)
- `POST /api/agents` - Create a new agent (protected)
- `GET /api/agents/:id` - Get agent by ID (protected)
- `PUT /api/agents/:id` - Update agent (protected)
- `DELETE /api/agents/:id` - Delete agent (protected)
- `POST /api/agents/login` - Agent login

### Contacts

- `POST /api/contacts/upload` - Upload and distribute contacts (protected)
- `GET /api/contacts/agent/:agentId` - Get contacts for a specific agent (protected)
- `GET /api/contacts/my-contacts` - Get contacts for logged-in agent (agent protected)
- `GET /api/contacts/batch/:batchId` - Get contacts by batch ID (protected)

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. When a user or agent logs in, a token is generated and returned to the client. This token must be included in the Authorization header for protected routes.

Example:
```
Authorization: Bearer <token>
```

## File Upload

The API supports uploading CSV, XLSX, and XLS files for contact distribution. Files are processed using Multer for handling multipart/form-data and temporarily stored in the uploads directory.

Supported file formats:
- CSV (.csv)
- Excel (.xlsx, .xls)

The uploaded file should contain the following columns:
- FirstName - Text
- Phone - Number
- Notes - Text (optional)

## Data Distribution Algorithm

When contacts are uploaded, they are distributed equally among all agents. If the number of contacts is not divisible by the number of agents, the remaining contacts are distributed sequentially.

Example:
- 25 contacts, 5 agents = 5 contacts per agent
- 27 contacts, 5 agents = 5 contacts for each agent, plus 1 extra contact for the first 2 agents

Implementation:
```javascript
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
```

## Error Handling

The API uses a centralized error handling middleware that catches all errors and returns appropriate HTTP status codes and error messages.

- 400 - Bad Request (invalid input)
- 401 - Unauthorized (authentication required)
- 404 - Not Found (resource not found)
- 500 - Server Error (unexpected errors)

## Middleware

### Authentication Middleware

- `protect` - Verifies JWT token and attaches user to request
- `admin` - Ensures the user has admin privileges
- `protectAgent` - Verifies JWT token for agent routes

### Error Middleware

- `notFound` - Handles 404 errors for undefined routes
- `errorHandler` - Centralized error handling

### Upload Middleware

- Handles file uploads using Multer
- Validates file types (CSV, XLSX, XLS)
- Sets file size limits (10MB)

## Controller Implementation Details

### User Controller

The user controller handles user authentication and profile management:

- `authUser`: Authenticates a user and returns a JWT token
- `registerUser`: Creates a new user account with password hashing
- `getUserProfile`: Retrieves the profile of the authenticated user

### Agent Controller

The agent controller manages agent-related operations:

- `createAgent`: Creates a new agent with the authenticated user as creator
- `getAgents`: Retrieves all agents created by the authenticated user
- `getAgentById`: Gets a specific agent by ID
- `updateAgent`: Updates an agent's information
- `deleteAgent`: Removes an agent from the system
- `authAgent`: Authenticates an agent and returns a JWT token

### Contact Controller

The contact controller handles CSV/Excel file uploads and contact distribution:

- `uploadContacts`: Processes uploaded files, extracts contacts, and distributes them
- `getAgentContacts`: Retrieves contacts assigned to a specific agent
- `getMyContacts`: Gets contacts assigned to the authenticated agent
- `getContactsByBatch`: Retrieves all contacts from a specific upload batch

## Security Considerations

1. **Password Security**
   - Passwords are hashed using bcrypt before storage
   - Password comparison is done securely without exposing the hash

2. **JWT Security**
   - Tokens expire after 30 days
   - Sensitive operations require authentication
   - Token verification on protected routes

3. **Input Validation**
   - All user inputs are validated before processing
   - File uploads are validated for type and size

4. **Error Handling**
   - Errors are handled gracefully without exposing sensitive information
   - Appropriate HTTP status codes are returned

## Performance Considerations

1. **Database Indexing**
   - Email fields are indexed for faster lookups
   - Foreign key references are indexed for efficient joins

2. **File Processing**
   - Files are processed in a streaming manner for memory efficiency
   - Temporary files are deleted after processing

3. **Query Optimization**
   - Queries select only necessary fields
   - Population of related data is limited to required fields

## Testing

### Manual Testing

You can test the API endpoints using tools like Postman or Insomnia. Here are some example requests:

1. **Register a User**
   ```
   POST /api/users
   Content-Type: application/json

   {
     "name": "Test User",
     "email": "test@example.com",
     "password": "password123"
   }
   ```

2. **Login**
   ```
   POST /api/users/login
   Content-Type: application/json

   {
     "email": "test@example.com",
     "password": "password123"
   }
   ```

3. **Create an Agent**
   ```
   POST /api/agents
   Content-Type: application/json
   Authorization: Bearer <your-token>

   {
     "name": "Test Agent",
     "email": "agent@example.com",
     "mobileNumber": "+1234567890",
     "password": "password123"
   }
   ```

4. **Upload Contacts**
   ```
   POST /api/contacts/upload
   Authorization: Bearer <your-token>
   Content-Type: multipart/form-data

   file: <your-csv-file>
   ```

### Automated Testing

For automated testing, you can use Jest and Supertest. Create test files in a `__tests__` directory:

```javascript
// Example test for user authentication
const request = require('supertest');
const app = require('../server');

describe('User Authentication', () => {
  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/users')
      .send({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123'
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('token');
  });
});
```

## Deployment

### Prerequisites

- Node.js installed on the server
- MongoDB instance (local or cloud-based like MongoDB Atlas)
- Environment variables configured

### Deployment Steps

1. **Clone the repository on your server**
   ```bash
   git clone <repository-url>
   cd Backend
   ```

2. **Install dependencies**
   ```bash
   npm install --production
   ```

3. **Set up environment variables**
   Create a `.env` file or set environment variables on your hosting platform:
   ```
   PORT=3000
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/agent-app
   JWT_SECRET=your_production_jwt_secret
   NODE_ENV=production
   ```

4. **Start the server**
   ```bash
   npm start
   ```

### Deployment Platforms

- **Heroku**
  - Create a Procfile: `web: node server.js`
  - Set environment variables in the Heroku dashboard
  - Deploy using Heroku CLI or GitHub integration

- **AWS**
  - Deploy to EC2 instance
  - Use PM2 for process management: `pm2 start server.js`
  - Set up a reverse proxy with Nginx

- **Docker**
  - Create a Dockerfile
  - Build the image: `docker build -t agent-app-backend .`
  - Run the container: `docker run -p 3000:3000 agent-app-backend`

## Maintenance and Monitoring

- Use logging tools like Winston or Morgan
- Monitor server health with tools like PM2 or New Relic
- Set up automated backups for the MongoDB database
- Implement rate limiting for API endpoints to prevent abuse

## Troubleshooting

### Common Issues

1. **Connection to MongoDB fails**
   - Check if MongoDB is running
   - Verify the connection string in the .env file
   - Ensure network connectivity to the MongoDB server

2. **JWT Authentication fails**
   - Check if the JWT_SECRET is properly set
   - Verify that the token is included in the Authorization header
   - Ensure the token hasn't expired

3. **File upload issues**
   - Check if the uploads directory exists and is writable
   - Verify that the file size is within limits (10MB)
   - Ensure the file format is supported (CSV, XLSX, XLS)

4. **Data distribution problems**
   - Verify that there are agents in the system
   - Check if the CSV file has the required columns (FirstName, Phone)
   - Ensure the file has valid data

### Debugging

- Set `NODE_ENV=development` for detailed error messages
- Check the server logs for error details
- Use console.log statements to trace execution flow
- Implement a logging system for better visibility

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request


## Conclusion

This backend API provides a robust foundation for the Agent Management System. It handles user authentication, agent management, and contact distribution efficiently. The modular architecture makes it easy to extend and maintain.

Key strengths of this implementation:
- Secure authentication with JWT
- Efficient data distribution algorithm
- Comprehensive error handling
- Support for multiple file formats
- Scalable architecture

For any questions or issues, please open an issue in the repository or contact the development team.
