import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import StoreList from '../components/User/StoreList';
import RatingForm from '../components/User/RatingForm';

const UserPage = () => {
    const [stores, setStores] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchStores = async () => {
            try {
                const response = await axios.get('/stores');
                setStores(response.data);
            } catch (err) {
                setError('Failed to fetch stores');
            } finally {
                setLoading(false);
            }
        };

        fetchStores();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="user-page">
            <h1 className="text-2xl font-bold">Browse Stores</h1>
            <StoreList stores={stores} />
            {/* <RatingForm /> */}
        </div>
    );
};

export default UserPage;