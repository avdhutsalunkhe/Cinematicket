import React, { useState } from 'react';
import axios from 'axios';
import gsap from 'gsap';

interface RatingFormProps {
  storeId: number;
}

const RatingForm: React.FC<RatingFormProps> = ({ storeId }) => {
  const [rating, setRating] = useState<number | "">(0);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleRatingChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRating(Number(e.target.value));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!rating || rating < 1 || rating > 5) {
      setError('Rating must be between 1 and 5');
      gsap.fromTo(".error-msg", { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 0.5 });
      return;
    }

    try {
      await axios.post('/ratings', { store_id: storeId, rating });
      setSuccess('Rating submitted successfully!');
      setRating(0);
      gsap.fromTo(".success-msg", { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 0.5 });
    } catch (err) {
      setError('Failed to submit rating. Please try again.');
      gsap.fromTo(".error-msg", { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 0.5 });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow-md w-full max-w-md mx-auto"
    >
      <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">Rate this Store</h2>

      {error && <p className="error-msg text-red-500 mb-3 text-center">{error}</p>}
      {success && <p className="success-msg text-green-500 mb-3 text-center">{success}</p>}

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">Select Rating</label>
        <select
          value={rating}
          onChange={handleRatingChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="" disabled>
            Select a rating
          </option>
          {[1, 2, 3, 4, 5].map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition"
      >
        Submit Rating
      </button>
    </form>
  );
};

export default RatingForm;
