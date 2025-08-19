import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    padding: '24px',
    background: 'linear-gradient(to bottom right, #e0f0ff, #f0f0f0)',
    textAlign: 'center'
  };

  const headingStyle: React.CSSProperties = {
    fontSize: '3rem',
    fontWeight: 800,
    marginBottom: '16px',
    color: '#333'
  };

  const paragraphStyle: React.CSSProperties = {
    fontSize: '1.125rem',
    marginBottom: '32px',
    color: '#555',
    maxWidth: '640px'
  };

  const buttonContainerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    gap: '16px',
    flexWrap: 'wrap',
    justifyContent: 'center'
  };

  const loginButtonStyle: React.CSSProperties = {
    padding: '12px 24px',
    backgroundColor: '#3b82f6',
    color: '#fff',
    fontWeight: 600,
    borderRadius: '12px',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s'
  };

  const signupButtonStyle: React.CSSProperties = {
    padding: '12px 24px',
    backgroundColor: '#10b981',
    color: '#fff',
    fontWeight: 600,
    borderRadius: '12px',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s'
  };

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>
        Welcome to the Store Rating & Review System
      </h1>
      <p style={paragraphStyle}>
        Browse and rate your favorite stores. Share your experiences and explore top-rated stores near you!
      </p>
      <div style={buttonContainerStyle}>
        <Link to="/login" style={loginButtonStyle}>
          Login
        </Link>
        <Link to="/signup" style={signupButtonStyle}>
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
