// src/pages/OwnerPage.tsx
import React, { useEffect, useState } from 'react';
import axios from '../api/axios';

// Define type for individual user rating
type UserRating = {
    id: string;
    name: string;
    rating: number;
};

// Define type for the dashboard data
type DashboardData = {
    average_rating: number;
    users_who_rated: UserRating[];
};

const OwnerPage: React.FC = () => {
    const [dashboardData, setDashboardData] = useState<DashboardData>({
        average_rating: 0,
        users_who_rated: [],
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchOwnerDashboard = async () => {
        try {
            const response = await axios.get<DashboardData>('/owner/dashboard');
            setDashboardData(response.data);
        } catch (err) {
            setError('Failed to fetch dashboard data');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOwnerDashboard();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold">Owner Dashboard</h1>
            <div className="mt-4">
                <h2 className="text-xl">Average Rating: {dashboardData.average_rating}</h2>
                <h3 className="mt-2">Users Who Rated:</h3>
                <ul>
                    {dashboardData.users_who_rated.map(user => (
                        <li key={user.id}>
                            {user.name} - Rating: {user.rating}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default OwnerPage;
