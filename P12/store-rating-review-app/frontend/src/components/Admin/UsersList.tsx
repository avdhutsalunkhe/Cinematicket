import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import gsap from 'gsap';

interface User {
  id: string;
  name: string;
  email: string;
  address: string;
  role: string;
}

const UsersList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const rowsRef = useRef<HTMLTableRowElement[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/admin/users');
        setUsers(response.data);
      } catch (err) {
        setError('Failed to fetch users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // GSAP animation for table rows
  useEffect(() => {
    if (rowsRef.current.length > 0) {
      gsap.from(rowsRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
      });
    }
  }, [users]);

  if (loading) return <div className="text-gray-600">Loading users...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Registered Users</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-md">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 text-left text-gray-700">Name</th>
              <th className="p-3 text-left text-gray-700">Email</th>
              <th className="p-3 text-left text-gray-700">Address</th>
              <th className="p-3 text-left text-gray-700">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={user.id}
                ref={(el) => (rowsRef.current[index] = el!)}
                className="border-b border-gray-200 hover:bg-gray-50 transition"
              >
                <td className="p-3">{user.name}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3">{user.address}</td>
                <td className="p-3">{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersList;
