# MERN Project for Process Management

This project is designed to manage and monitor process statuses and their console logs on a server. It allows users to run specific processes or batch processes, monitor their statuses, and stop them if needed. The application also includes functionality for registering endpoint URLs to return channel information, and running a parser binary with selected channel information.

## Process Management

This project includes features for managing and monitoring processes on a server:
- Run specific processes or batch processes.
- Monitor process statuses and console logs.
- Stop processes when needed.
- Register endpoint URLs that return channel information.
- Run a parser binary with selected channel information.

## Setup Backend

1. Rename the file `.variables.env.tmp` to `.variables.env`.
2. Open `.variables.env` and paste your MongoDB URL in the `DATABASE` field: `DATABASE=your-mongodb-url`.
3. Run `npm install` to install backend dependencies.
4. Run `npm setup` to set up the backend environment.

## Setup Frontend

1. Navigate to the frontend directory: `cd frontend`.
2. Run `npm install` to install frontend dependencies.
3. Change the API configuration to localhost in `src/frontend/src/config/serverApiConfig.js`.

## Start Server

1. Run `npm start` in the root directory to start the backend server.

## Start React App

1. Navigate to the frontend directory: `cd frontend`.
2. Run `npm start` to start the React application.

