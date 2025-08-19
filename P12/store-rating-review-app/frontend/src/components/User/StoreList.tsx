import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface Store {
  id: number;
  name: string;
  address: string;
  rating: number;
}

interface StoreListProps {
  stores: Store[];
}

const StoreList: React.FC<StoreListProps> = ({ stores }) => {
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (stores.length && listRef.current) {
      gsap.from(listRef.current.children, {
        opacity: 0,
        y: 30,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power3.out',
      });
    }
  }, [stores]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">Store List</h1>
      <ul ref={listRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stores.map((store) => (
          <li
            key={store.id}
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition transform hover:scale-105"
          >
            <h2 className="text-xl font-semibold mb-2 text-gray-800">{store.name}</h2>
            <p className="text-gray-600 mb-2">{store.address}</p>
            <p className="text-yellow-500 font-medium">Overall Rating: {store.rating}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StoreList;
