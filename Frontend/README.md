# Agent Management System - Frontend

![React](https://img.shields.io/badge/React-18.x-61DAFB)
![Vite](https://img.shields.io/badge/Vite-4.x-646CFF)
![Redux](https://img.shields.io/badge/Redux-Toolkit-764ABC)
![Tailwind](https://img.shields.io/badge/Tailwind-CSS-38B2AC)

This is the frontend application for the Agent Management System, a MERN stack application that allows users to manage agents and distribute CSV data among them. The frontend is built with React and Vite, featuring a modern dark-themed UI with Tailwind CSS for a sleek, professional appearance.

The application provides a complete solution for managing agents and distributing contacts, with features including user authentication, agent management (CRUD operations), CSV/Excel file upload, and equal distribution of contacts among agents.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Project Structure](#project-structure)
- [Setup and Installation](#setup-and-installation)
- [Component Architecture](#component-architecture)
- [State Management](#state-management)
- [Routing](#routing)
- [UI Components](#ui-components)
- [Authentication](#authentication)
- [CSV Upload and Distribution](#csv-upload-and-distribution)
- [Responsive Design](#responsive-design)
- [API Integration](#api-integration)
- [Error Handling](#error-handling)
- [Performance Optimizations](#performance-optimizations)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)

## Features

### Core Functionality
- **User Authentication**
  - Secure login and registration with JWT
  - Protected routes for authenticated users
  - Persistent sessions with localStorage

- **Dashboard**
  - Overview of system statistics
  - Quick access to key features
  - Summary of agent distribution

- **Agent Management**
  - Complete CRUD operations for agents
  - Detailed agent profiles
  - Search and filter capabilities
  - Pagination for large datasets

- **CSV/Excel Upload**
  - Support for multiple file formats (CSV, XLSX, XLS)
  - File validation and error handling
  - Progress indicators during upload

- **Contact Distribution**
  - Automatic equal distribution algorithm
  - View distribution results by batch
  - Agent-specific contact lists
  - Distribution statistics

### UI/UX Features
- **Modern Dark Theme**
  - Consistent dark mode across all components
  - Optimized CSS with minimal variables
  - High contrast for readability

- **Responsive Design**
  - Mobile-first approach
  - Adaptive layouts for all screen sizes
  - Touch-friendly interface elements

- **Interactive Components**
  - Form validation with immediate feedback
  - Toast notifications for user actions
  - Loading states and skeleton screens
  - Smooth transitions between screens

## Technologies

### Core Technologies
- **React 18** - Modern frontend library for building user interfaces with hooks and functional components
- **Vite** - Next-generation frontend tooling with fast HMR (Hot Module Replacement)
- **Redux Toolkit** - State management with simplified Redux implementation
- **React Router v6** - Declarative routing for React applications

### Styling & UI
- **Tailwind CSS** - Utility-first CSS framework for rapid UI development
- **CSS Variables** - Custom properties for consistent theming
- **React Toastify** - Toast notifications for user feedback
- **Custom Components** - Reusable UI components built from scratch

### API & Data Handling
- **Axios** - Promise-based HTTP client for API requests
- **Redux Thunks** - Middleware for handling asynchronous actions
- **JWT** - JSON Web Tokens for secure authentication
- **LocalStorage** - Browser storage for persisting user session

### Development & Tooling
- **ESLint** - Static code analysis for identifying problematic patterns
- **Prettier** - Code formatter for consistent code style
- **npm** - Package manager for JavaScript
- **Git** - Version control system

## Project Structure

```
Frontend/
├── public/             # Static assets
├── src/
│   ├── components/     # Reusable UI components
│   │   ├── Alert.jsx
│   │   ├── Button.jsx
│   │   ├── Card.jsx
│   │   ├── Header.jsx
│   │   ├── Input.jsx
│   │   ├── PrivateRoute.jsx
│   │   ├── Skeleton.jsx
│   │   └── Table.jsx
│   ├── redux/          # Redux state management
│   │   ├── agentSlice.js
│   │   ├── authSlice.js
│   │   ├── contactSlice.js
│   │   └── store.js
│   ├── screens/        # Page components
│   │   ├── AgentContactsScreen.jsx
│   │   ├── AgentEditScreen.jsx
│   │   ├── AgentListScreen.jsx
│   │   ├── DashboardScreen.jsx
│   │   ├── DistributionScreen.jsx
│   │   ├── LoginScreen.jsx
│   │   ├── RegisterScreen.jsx
│   │   └── UploadScreen.jsx
│   ├── utils/          # Utility functions
│   │   └── api.js
│   ├── App.jsx         # Main application component
│   ├── index.css       # Global styles
│   └── main.jsx        # Application entry point
├── .env                # Environment variables
├── index.html          # HTML template
├── package.json        # Project dependencies
├── tailwind.config.js  # Tailwind CSS configuration
└── vite.config.js      # Vite configuration
```

## Setup and Installation

### Prerequisites
- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher) or yarn
- Git

### Development Setup

1. **Clone the repository**

```bash
git clone <repository-url>
cd mern-agent-app/Frontend
```

2. **Install dependencies**

```bash
# Using npm
npm install

# Using yarn
yarn install
```

3. **Set up environment variables**

Create a `.env` file in the root of the Frontend directory:

```
# API URL - Point to your backend server
VITE_API_URL=http://localhost:3000/api

# Optional: Set the port for the dev server
VITE_PORT=3001
```

4. **Start the development server**

```bash
# Using npm
npm run dev

# Using yarn
yarn dev
```

The application will be available at `http://localhost:3001` (or the port you specified).

### Available Scripts

- **Development server**
  ```bash
  npm run dev
  ```

- **Build for production**
  ```bash
  npm run build
  ```

- **Preview production build**
  ```bash
  npm run preview
  ```

- **Lint code**
  ```bash
  npm run lint
  ```

### Backend Integration

For the application to function properly, you need to have the backend server running. See the [Backend README](../Backend/README.md) for setup instructions.

### Working with the Backend

1. Make sure the backend server is running on the URL specified in your `.env` file
2. The frontend will automatically connect to the backend API
3. For local development, ensure CORS is properly configured on the backend

## Component Architecture

The frontend follows a component-based architecture with the following key components:

### Core Components

- **App.jsx** - The main application component that sets up routing and global providers
- **Header.jsx** - Navigation header with responsive menu
- **PrivateRoute.jsx** - Route wrapper for authentication protection
- **index.html** - Contains the root HTML with the dark class applied directly

### UI Components

- **Button.jsx** - Reusable button component with multiple variants
- **Card.jsx** - Container component for content sections
- **Input.jsx** - Form input component with validation
- **Alert.jsx** - Notification component for user feedback
- **Table.jsx** - Data table component with sorting and filtering
- **Skeleton.jsx** - Loading placeholder components

### Screen Components

- **LoginScreen.jsx** - User login form
- **RegisterScreen.jsx** - User registration form
- **DashboardScreen.jsx** - Main dashboard with overview statistics
- **AgentListScreen.jsx** - List of agents with CRUD operations
- **AgentEditScreen.jsx** - Form for adding/editing agents
- **AgentContactsScreen.jsx** - Contacts assigned to a specific agent
- **UploadScreen.jsx** - CSV/Excel file upload form
- **DistributionScreen.jsx** - Results of contact distribution

## State Management

The application uses Redux Toolkit for state management with the following slices:

### Auth Slice

Manages user authentication state:
- Login/logout actions
- Registration
- User information storage
- Authentication status

### Agent Slice

Manages agent-related state:
- Agent list
- Agent creation, update, and deletion
- Agent selection

### Contact Slice

Manages contact-related state:
- Contact upload
- Contact distribution
- Contact retrieval by agent or batch

## Routing

The application uses React Router for navigation with the following routes:

- `/login` - User login page
- `/register` - User registration page
- `/dashboard` - Main dashboard (protected)
- `/agents` - Agent list (protected)
- `/agents/add` - Add new agent (protected)
- `/agents/edit/:id` - Edit existing agent (protected)
- `/agents/contacts/:agentId` - View agent contacts (protected)
- `/upload` - Upload CSV/Excel file (protected)
- `/distribution/:batchId` - View distribution results (protected)

## UI Components

### Button Component

The Button component supports multiple variants:
- Primary - Main action buttons
- Secondary - Alternative action buttons
- Success - Positive action buttons
- Danger - Destructive action buttons
- Warning - Cautionary action buttons
- Outline - Bordered buttons
- Ghost - Text-only buttons

```jsx
<Button
  variant="primary"
  size="md"
  onClick={handleClick}
  disabled={loading}
  loading={loading}
  fullWidth
>
  Submit
</Button>
```

### Card Component

The Card component is used for content sections:

```jsx
<Card
  title="Section Title"
  subtitle="Optional subtitle"
  footer={<Button>Action</Button>}
>
  Card content goes here
</Card>
```

### Input Component

The Input component handles form inputs with validation:

```jsx
<Input
  id="email"
  label="Email Address"
  type="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  error={emailError}
  required
/>
```

### Table Component

The Table component displays data in a structured format:

```jsx
<Table>
  <TableHead>
    <TableRow>
      <TableHeader>Name</TableHeader>
      <TableHeader>Email</TableHeader>
      <TableHeader>Actions</TableHeader>
    </TableRow>
  </TableHead>
  <TableBody>
    {data.map(item => (
      <TableRow key={item.id}>
        <TableCell>{item.name}</TableCell>
        <TableCell>{item.email}</TableCell>
        <TableCell>
          <Button variant="ghost" size="sm">Edit</Button>
        </TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>
```

## Authentication

The application uses JWT for authentication:

1. **Login Process**
   - User submits credentials
   - Backend validates and returns JWT token
   - Token is stored in localStorage
   - User is redirected to dashboard

2. **Protected Routes**
   - PrivateRoute component checks for valid token
   - Unauthenticated users are redirected to login
   - Token is included in API requests via interceptor

3. **Logout Process**
   - Token is removed from localStorage
   - User is redirected to login page
   - Redux state is cleared

## CSV Upload and Distribution

The CSV upload and distribution process works as follows:

1. **File Selection**
   - User selects a CSV, XLSX, or XLS file
   - Frontend validates file type and size

2. **File Upload**
   - File is sent to backend using multipart/form-data
   - Progress indicator shows upload status

3. **Distribution**
   - Backend processes file and distributes contacts
   - Frontend receives batch ID and success message

4. **Results View**
   - Distribution results are displayed by agent
   - User can view detailed breakdown of assignments

## Responsive Design

The application is fully responsive:

1. **Mobile-First Approach**
   - Base styles are designed for mobile devices
   - Media queries enhance the layout for larger screens

2. **Responsive Components**
   - Flexible layouts using Flexbox and Grid
   - Responsive typography with appropriate sizing

3. **Adaptive Navigation**
   - Collapsible menu on mobile devices
   - Full navigation bar on desktop

## API Integration

The application communicates with the backend API:

1. **API Client**
   - Axios instance with base URL and default headers
   - Request/response interceptors for authentication and error handling

2. **Redux Thunks**
   - Async actions using createAsyncThunk
   - Loading, success, and error states for each request

3. **Error Handling**
   - Toast notifications for API errors
   - Form validation errors displayed inline

## Error Handling

The application handles errors at multiple levels:

1. **Form Validation**
   - Client-side validation before submission
   - Inline error messages for invalid inputs

2. **API Errors**
   - Toast notifications for server errors
   - Specific error messages based on API response

3. **Authentication Errors**
   - Automatic redirect to login for authentication failures
   - Clear error messages for login/registration issues

4. **Network Errors**
   - Fallback UI for network failures
   - Retry mechanisms for transient errors

## Performance Optimizations

The application includes several performance optimizations:

1. **Code Splitting**
   - Vite's built-in code splitting for smaller bundles
   - Lazy loading of route components

2. **Memoization**
   - React.memo for expensive components
   - useCallback and useMemo for optimized renders

3. **Efficient Rendering**
   - Conditional rendering to minimize DOM updates
   - Skeleton loaders for better perceived performance

4. **CSS Optimization**
   - Minimal CSS variables with only essential values
   - Single animation (fade-in) for essential transitions
   - Streamlined global styles without redundant properties
   - Efficient use of Tailwind's utility classes

## Deployment

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- Backend API running and accessible

### Deployment Steps

1. **Build the application**

```bash
npm run build
```

2. **Deploy the build folder**

The `dist` folder contains the built application that can be deployed to any static hosting service.

### Deployment Platforms

- **Netlify**
  - Connect to your Git repository
  - Set build command: `npm run build`
  - Set publish directory: `dist`

- **Vercel**
  - Import your Git repository
  - Vercel will automatically detect Vite and configure the build

- **GitHub Pages**
  - Set `base` in `vite.config.js` to your repository name
  - Use gh-pages package for deployment

## Troubleshooting

### Common Issues

1. **API Connection Issues**
   - Check if the backend server is running
   - Verify the API URL in the .env file
   - Check for CORS issues in the browser console

2. **Authentication Problems**
   - Clear localStorage and try logging in again
   - Check if the token is being properly stored
   - Verify that protected routes are working correctly

3. **CSV Upload Issues**
   - Ensure the file format is supported (CSV, XLSX, XLS)
   - Check if the file size is within limits
   - Verify that the file has the required columns

4. **Rendering Problems**
   - Check for console errors
   - Verify that Redux state is being properly updated
   - Ensure components are receiving the correct props

### Debugging

- Use browser developer tools to inspect network requests
- Check Redux DevTools for state changes
- Add console.log statements for debugging
- Use React DevTools to inspect component hierarchy

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## Conclusion

The Agent Management System frontend provides a modern, responsive, and user-friendly interface for managing agents and distributing contacts. Built with React, Vite, and Tailwind CSS, it offers a seamless user experience with a simplified dark-themed UI that's consistent across the entire application.

Key strengths of this implementation:
- Modern component architecture with reusable UI components
- Efficient state management with Redux Toolkit
- Responsive design that works on all devices
- Comprehensive error handling and user feedback
- Performance optimizations for a smooth experience

The application demonstrates best practices in React development, including:
- Component composition and reusability
- Proper state management
- Efficient API integration
- Responsive design principles
- Accessibility considerations

For any questions or issues, please open an issue in the repository or contact the development team.
