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
    background: 'linear-gradient(135deg, #dbeafe 0%, #fef9c3 100%)',
    textAlign: 'center',
    animation: 'fadeIn 1s ease-in-out',
  };

  const headingStyle: React.CSSProperties = {
    fontSize: '3.5rem',
    fontWeight: 900,
    marginBottom: '20px',
    color: '#1e293b',
    textShadow: '2px 4px 6px rgba(0,0,0,0.1)',
    letterSpacing: '1px',
  };

  const paragraphStyle: React.CSSProperties = {
    fontSize: '1.25rem',
    marginBottom: '40px',
    color: '#475569',
    maxWidth: '700px',
    lineHeight: 1.7,
  };

  const buttonContainerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    gap: '20px',
    flexWrap: 'wrap',
    justifyContent: 'center',
  };

  const baseButtonStyle: React.CSSProperties = {
    padding: '14px 32px',
    fontSize: '1rem',
    fontWeight: 700,
    borderRadius: '14px',
    border: 'none',
    cursor: 'pointer',
    textDecoration: 'none',
    transition: 'all 0.3s ease',
    boxShadow: '0 6px 12px rgba(0,0,0,0.1)',
  };

  const loginButtonStyle: React.CSSProperties = {
    ...baseButtonStyle,
    backgroundColor: '#3b82f6',
    color: '#fff',
  };

  const signupButtonStyle: React.CSSProperties = {
    ...baseButtonStyle,
    backgroundColor: '#10b981',
    color: '#fff',
  };

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>Welcome to the Store Rating & Review System</h1>
      <p style={paragraphStyle}>
        Discover, rate, and share your experiences with your favorite stores. 
        Find the top-rated businesses near you and make smarter shopping decisions!
      </p>
      <div style={buttonContainerStyle}>
        <Link
          to="/login"
          style={loginButtonStyle}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = '#2563eb')
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = '#3b82f6')
          }
        >
          Login
        </Link>
        <Link
          to="/signup"
          style={signupButtonStyle}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = '#059669')
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = '#10b981')
          }
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
