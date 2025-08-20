import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const Navbar: React.FC = () => {
  const { user } = useAuth(); // Use the authentication hook

  return (
    <nav
      style={{
        backgroundColor: '#1f2937', // bg-gray-900
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 50,
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '16px 24px',
        }}
      >
        {/* Logo / Brand */}
        <div
          style={{
            color: '#ffffff',
            fontSize: '1.5rem',
            fontWeight: 'bold',
            letterSpacing: '1px',
          }}
        >
          Store Rating & Review
        </div>

        {/* Navigation Links */}
        <div
          style={{
            display: 'flex',
            gap: '24px',
          }}
        >
          <Link
            to="/"
            style={{
              color: '#e5e7eb',
              textDecoration: 'none',
              fontWeight: 500,
              transition: 'color 0.3s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#e5e7eb')}
          >
            Home
          </Link>
          <Link
            to="/user"
            style={{
              color: '#e5e7eb',
              textDecoration: 'none',
              fontWeight: 500,
              transition: 'color 0.3s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#e5e7eb')}
          >
            User
          </Link>
          {/* Conditionally render Owner link */}
          {user && user.role === 'store_owner' && (
            <Link
              to="/owner"
              style={{
                color: '#e5e7eb',
                textDecoration: 'none',
                fontWeight: 500,
                transition: 'color 0.3s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#e5e7eb')}
            >
              Owner
            </Link>
          )}
          {/* Conditionally render Admin link */}
          {user && user.role === 'admin' && (
            <Link
              to="/admin"
              style={{
                color: '#e5e7eb',
                textDecoration: 'none',
                fontWeight: 500,
                transition: 'color 0.3s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#e5e7eb')}
            >
              Admin
            </Link>
          )}
        </div>

        {/* Mobile Menu Placeholder */}
        <div
          style={{
            display: 'none', // hide by default, can add responsive logic later
            color: '#e5e7eb',
            cursor: 'pointer',
          }}
        >
          ☰
        </div>
      </div>
    </nav>
  );
};

export default Navbar;