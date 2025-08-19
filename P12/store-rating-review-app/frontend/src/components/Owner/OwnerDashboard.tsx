import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import gsap from 'gsap';

interface UserRating {
  id: number;
  name: string;
  rating: number;
}

const OwnerDashboard: React.FC = () => {
  const [averageRating, setAverageRating] = useState<number | null>(null);
  const [usersWhoRated, setUsersWhoRated] = useState<UserRating[]>([]);
  const storeId = 1; // Replace with actual store ID from context or props
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const fetchOwnerDashboardData = async () => {
      try {
        const response = await axios.get(`/owner/dashboard?storeId=${storeId}`);
        setAverageRating(response.data.average_rating);
        setUsersWhoRated(response.data.users_who_rated);
      } catch (error) {
        console.error('Error fetching owner dashboard data:', error);
      }
    };

    fetchOwnerDashboardData();
  }, [storeId]);

  // Animate the list of users who rated
  useEffect(() => {
    if (listRef.current) {
      gsap.from(listRef.current.children, {
        opacity: 0,
        y: 20,
        stagger: 0.1,
        duration: 0.5,
        ease: 'power3.out',
      });
    }
  }, [usersWhoRated]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Owner Dashboard</h1>

      {averageRating !== null && (
        <div className="bg-white p-6 rounded-xl shadow mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-700">Average Rating</h2>
          <span className="text-2xl font-bold text-yellow-500">{averageRating.toFixed(1)} ⭐</span>
        </div>
      )}

      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Users Who Rated Your Store</h2>
        {usersWhoRated.length === 0 ? (
          <p className="text-gray-500">No ratings yet.</p>
        ) : (
          <ul ref={listRef} className="space-y-2">
            {usersWhoRated.map((user) => (
              <li
                key={user.id}
                className="p-4 border rounded-lg flex justify-between items-center hover:shadow-md transition"
              >
                <span className="font-medium text-gray-800">{user.name}</span>
                <span className="text-yellow-500 font-bold">{user.rating} ⭐</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default OwnerDashboard;
