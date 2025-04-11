# TA Intern Assignment

## Overview

The backend of this system handles job application management, including creation, retrieval, updating (such as changing the application status), and deletion of applications. It ensures seamless communication between the frontend and the database, while also maintaining detailed error logs for easier debugging.

## Features

### Job Application Management

- Create, update, and delete job applications.

### Logging System

- Logs errors and stores them in a designated folder for debugging.
- Ensures better tracking of backend issues.

## Tech Stack

### Frontend

- **React.js**
- **React-Bootstarp**

### Backend

- **Node.js**
- **Express.js**
- **MongoDB** (Database)

### Additional Tools

- **Winston** (for logging errors)

## Installation

Follow these steps to set up the backend locally:

```sh
# Clone the repository
git clone https://github.com/var-shikhar/cuvette-ts-assignment.git
cd Frontend
cd Backend

# Install dependencies
npm install

# Copy environment variables template and configure settings
cp .env.example .env

# Start the backend server
npm run dev
```

## Usage & Code Structure

### Modularized Codebase

- The backend is structured for better maintainability and scalability.
- Routes, controllers, and services are organized into separate modules.

### Logging System

- Uses `Winston` for error logging.
- Logs are stored in a designated folder for debugging and monitoring.

## Environment Variables

Ensure you configure the `.env` file with the required credentials:

```env
PORT=your_backend_port
FRONTEND_PORT=your_frontend_port
DEV_FRONTEND_PORT=your_dev_frontend_port
MONGO_URI=your_mongodb_connection_string
SALT=your_salt_value
NODE_ENV=development_or_production
```

```env
VITE_APP_BE_URL=your_backend_port
```

## Contact

For more details, reach out to:

**Shikhar Varshney**  
📧 Email: [shikharvarshney10@gmail.com](mailto:shikharvarshney10@gmail.com)
