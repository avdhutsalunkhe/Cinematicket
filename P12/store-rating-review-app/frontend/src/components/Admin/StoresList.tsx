import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import gsap from 'gsap';

interface Store {
  id: string;
  name: string;
  email: string;
  address: string;
  owner_id: string;
}

const StoresList: React.FC = () => {
  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const rowsRef = useRef<HTMLTableRowElement[]>([]);

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await axios.get('/admin/stores');
        setStores(response.data);
      } catch (err) {
        setError('Failed to fetch stores');
      } finally {
        setLoading(false);
      }
    };

    fetchStores();
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
  }, [stores]);

  if (loading) return <div className="text-gray-600">Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Stores List</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-md">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 text-left text-gray-700">Store Name</th>
              <th className="p-3 text-left text-gray-700">Email</th>
              <th className="p-3 text-left text-gray-700">Address</th>
              <th className="p-3 text-left text-gray-700">Owner ID</th>
            </tr>
          </thead>
          <tbody>
            {stores.map((store, index) => (
              <tr
                key={store.id}
                ref={(el) => (rowsRef.current[index] = el!)}
                className="border-b border-gray-200 hover:bg-gray-50 transition"
              >
                <td className="p-3">{store.name}</td>
                <td className="p-3">{store.email}</td>
                <td className="p-3">{store.address}</td>
                <td className="p-3">{store.owner_id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StoresList;
