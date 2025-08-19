# Store Rating & Review Management System - Backend

## Overview

This backend application is built using **Express.js** and **SQLite3** to manage a Store Rating & Review Management System. It provides a RESTful API for handling user authentication, store management, and rating submissions.

## Tech Stack

- **Node.js**: JavaScript runtime for building the backend.
- **Express.js**: Web framework for Node.js to create the API.
- **SQLite3**: Lightweight database for storing user, store, and rating data.
- **JWT**: JSON Web Tokens for secure authentication.

## Features

### User Roles

1. **System Administrator**
   - Manage stores and users.
   - Access to a dashboard with statistics.

2. **Normal User**
   - Register and login.
   - Browse and rate stores.

3. **Store Owner**
   - Access their store's dashboard.
   - View ratings and user feedback.

## API Endpoints

- **Authentication**
  - `POST /auth/signup`: Register a new user.
  - `POST /auth/login`: Login for all roles.
  - `PUT /auth/update-password`: Update user password.

- **Admin Routes**
  - `POST /admin/add-user`: Add a new user.
  - `POST /admin/add-store`: Add a new store.
  - `GET /admin/dashboard`: Get dashboard statistics.
  - `GET /admin/users`: List users with filters.
  - `GET /admin/stores`: List stores with filters.

- **User Routes**
  - `GET /stores`: List and search stores.
  - `POST /ratings`: Submit a rating for a store.
  - `PUT /ratings/:id`: Update an existing rating.

- **Store Owner Routes**
  - `GET /owner/dashboard`: Get average rating and users who rated the store.

## Database Schema

The database consists of three main tables:

1. **Users**: Stores user information and roles.
2. **Stores**: Stores information about each store.
3. **Ratings**: Stores ratings submitted by users for each store.

## Setup Instructions

1. **Clone the repository**:
   ```
   git clone <repository-url>
   cd store-rating-review-app/backend
   ```

2. **Install dependencies**:
   ```
   npm install
   ```

3. **Run the application**:
   ```
   npm start
   ```

4. **Database Setup**: The SQLite database will be created automatically on the first run.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.