// src/pages/UserPage.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

const UserPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Update the API endpoint with your backend URL
        const res = await axios.get<User[]>("http://localhost:5000/api/users");
        setUsers(res.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <h2 style={{ textAlign: "center" }}>Loading users...</h2>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Users List</h1>
      {users.length === 0 ? (
        <p style={{ textAlign: "center" }}>No users found.</p>
      ) : (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            backgroundColor: "#f9f9f9",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#ddd" }}>
              <th style={tableHeader}>ID</th>
              <th style={tableHeader}>Name</th>
              <th style={tableHeader}>Email</th>
              <th style={tableHeader}>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td style={tableCell}>{user.id}</td>
                <td style={tableCell}>{user.name}</td>
                <td style={tableCell}>{user.email}</td>
                <td style={tableCell}>{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

const tableHeader: React.CSSProperties = {
  border: "1px solid #ccc",
  padding: "10px",
  textAlign: "left",
  fontWeight: "bold",
};

const tableCell: React.CSSProperties = {
  border: "1px solid #ccc",
  padding: "10px",
};

export default UserPage;
