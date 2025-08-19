# Store Rating & Review Management System

This is a FullStack web application built using React for the frontend and Express for the backend, with SQLite3 as the database. The application allows users to rate and review stores, providing a platform for feedback and interaction between users and store owners.

## Tech Stack

- **Frontend:** React.js
  - Axios for API calls
  - Tailwind CSS / Material UI for styling
- **Backend:** Express.js (Node.js)
- **Database:** SQLite3
- **Authentication:** JWT-based authentication with role-based access control

## User Roles

1. **System Administrator**
2. **Normal User**
3. **Store Owner**

## Features

### System Administrator

- Manage stores and users (Normal/Admin/Store Owner)
- Dashboard with total counts of users, stores, and ratings
- View and filter stores and users lists
- View store owner details and their ratings

### Normal User

- Register and login
- Update password
- Browse and search stores
- Submit and update ratings for stores

### Store Owner

- Login and update password
- Access dashboard with average ratings and user feedback

## Getting Started

### Prerequisites

- Node.js
- npm or yarn
- SQLite3

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd store-rating-review-app
   ```

2. Navigate to the frontend directory and install dependencies:
   ```
   cd frontend
   npm install
   ```

3. Navigate to the backend directory and install dependencies:
   ```
   cd ../backend
   npm install
   ```

4. Set up the SQLite database:
   - Ensure the SQLite database is created and configured in `backend/src/db/sqlite.ts`.

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

3. Open your browser and navigate to `http://localhost:3000` to access the application.

## API Endpoints

- **Auth**
  - `POST /auth/signup` - Register a new user
  - `POST /auth/login` - User login
  - `PUT /auth/update-password` - Update user password

- **Admin**
  - `POST /admin/add-user` - Add a new user
  - `POST /admin/add-store` - Add a new store
  - `GET /admin/dashboard` - Admin dashboard data
  - `GET /admin/users` - List of users
  - `GET /admin/stores` - List of stores

- **User**
  - `GET /stores` - List and search stores
  - `POST /ratings` - Submit a rating
  - `PUT /ratings/:id` - Update a rating

- **Store Owner**
  - `GET /owner/dashboard` - Store owner dashboard data

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.