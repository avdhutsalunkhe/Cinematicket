import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import gsap from 'gsap';

interface DashboardData {
  totalUsers: number;
  totalStores: number;
  totalRatings: number;
}

interface Stat {
  title: string;
  value: number;
}

const Dashboard: React.FC = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData>({
    totalUsers: 0,
    totalStores: 0,
    totalRatings: 0,
  });

  const cardsRef = useRef<HTMLDivElement[]>([]);

  // Fetch dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get('/admin/dashboard');
        setDashboardData(response.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };
    fetchDashboardData();
  }, []);

  // GSAP animation on mount
  useEffect(() => {
    if (cardsRef.current.length > 0) {
      gsap.from(cardsRef.current, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
      });
    }
  }, [dashboardData]);

  const stats: Stat[] = [
    { title: 'Total Users', value: dashboardData.totalUsers },
    { title: 'Total Stores', value: dashboardData.totalStores },
    { title: 'Total Ratings', value: dashboardData.totalRatings },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <div
            key={stat.title}
            ref={(el) => (cardsRef.current[index] = el!)}
            className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center justify-center text-center transform transition hover:scale-105 hover:shadow-2xl"
          >
            <p className="text-gray-500 mb-2">{stat.title}</p>
            <p className="text-3xl font-semibold text-gray-800">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
