﻿# Dynamic-TODO-List
**Overview**
This project is a full-stack TODO Manager application designed to help users manage their task lists effectively. It uses a React Native frontend for the user interface and a Node.js backend with Redis for persistent storage.

**Features**
Frontend
User-Friendly Interface: Manage TODO items using a clean, interactive UI​
Task Management:
Add, edit, and delete TODO items.
Clear all tasks or restore the list from Redis storage​

React Native: Built using React Native for a seamless experience​

Backend
Express.js API:
Load TODO list from Redis.
Save tasks to Redis storage.
Clear tasks from Redis​

Redis Integration: Fast and efficient storage for managing tasks​
​
**Technologies Used**
Frontend
React Native
Axios for API communication​

Backend
Node.js
Express.js
Redis for database storage
CORS and Body-Parser for handling requests​

**Installation**
Prerequisites
Node.js installed on your system.
Redis instance running and accessible.

Steps
Backend
1.Navigate to the backend folder:
cd backend
2.Install dependencies:
npm install
3.Start the backend server:
node index.js
The server will be running at http://localhost:3001.

Frontend
1.Navigate to the frontend folder:
cd frontend
2.Install dependencies:
npm install
3.Start the React Native development server:
npm start
Run the app on your emulator or connected device.

**Usage**
Start the backend server to enable API endpoints.
Open the React Native app.
Add TODO items, edit existing ones, or delete them.
Use the Save button to persist tasks to Redis storage.
Restore saved tasks or clear all tasks with a single button.

**API Endpoints**
GET /load: Retrieve the TODO list.
POST /save: Save the current TODO list.
GET /clear: Clear all tasks from Redis.
