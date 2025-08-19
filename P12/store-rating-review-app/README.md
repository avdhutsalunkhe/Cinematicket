# Store Rating & Review Management System

## Overview

The Store Rating & Review Management System is a full-stack web application that allows users to rate and review stores. The application is built using React for the frontend and Express.js for the backend, with SQLite3 as the database. It features role-based access control for different user types, including System Administrators, Normal Users, and Store Owners.

## Tech Stack

- **Frontend:** React.js, Axios, Tailwind CSS / Material UI
- **Backend:** Express.js (Node.js)
- **Database:** SQLite3
- **Authentication:** JWT-based authentication with role-based access control

## User Roles

1. **System Administrator**
   - Manage stores and users
   - View dashboards and lists of users and stores

2. **Normal User**
   - Register and log in
   - Browse and rate stores

3. **Store Owner**
   - Log in and manage their store's ratings
   - View dashboard with user ratings

## Features

### System Administrator
- Add/manage stores and users
- Dashboard with total users, stores, and ratings
- View lists of stores and users with filters/sorting
- View store owner details and their ratings

### Normal User
- Register and log in
- Update password
- Browse/search stores
- Submit and update ratings for stores

### Store Owner
- Log in and update password
- Dashboard with average rating and list of users who rated their store

## Database Schema

The application uses SQLite3 with the following schema:

- **Users Table:** Stores user information and roles.
- **Stores Table:** Stores information about stores and their owners.
- **Ratings Table:** Stores ratings submitted by users for stores.

## API Endpoints

### Auth
- `POST /auth/signup` - Normal user registration
- `POST /auth/login` - Login for all roles
- `PUT /auth/update-password` - Update user password

### Admin
- `POST /admin/add-user` - Add a new user
- `POST /admin/add-store` - Add a new store
- `GET /admin/dashboard` - Get dashboard statistics
- `GET /admin/users` - Get list of users with filters
- `GET /admin/stores` - Get list of stores with filters

### User
- `GET /stores` - List and search stores
- `POST /ratings` - Submit a rating
- `PUT /ratings/:id` - Update a rating

### Store Owner
- `GET /owner/dashboard` - Get average rating and users who rated their store

## Getting Started

### Prerequisites

- Node.js
- npm
- SQLite3

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd store-rating-review-app
   ```

2. Install backend dependencies:
   ```
   cd backend
   npm install
   ```

3. Install frontend dependencies:
   ```
   cd frontend
   npm install
   ```

### Running the Application

1. Start the backend server:
   ```
   cd backend
   npm start
   ```

2. Start the frontend application:
   ```
   cd frontend
   npm start
   ```

## License

This project is licensed under the MIT License. See the LICENSE file for details.