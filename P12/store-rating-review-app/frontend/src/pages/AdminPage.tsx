import React, { useState, useRef, useEffect } from 'react';
import Dashboard from '../components/Admin/Dashboard';
import UsersList from '../components/Admin/UsersList';
import StoresList from '../components/Admin/StoresList';
import gsap from 'gsap';

const tabs = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'users', label: 'Users List' },
  { id: 'stores', label: 'Stores List' },
];

const AdminPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const contentRef = useRef<HTMLDivElement>(null);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
  };

  // Animate content on tab change
  useEffect(() => {
    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }
      );
    }
  }, [activeTab]);

  // Styles
  const containerStyle: React.CSSProperties = {
    padding: '24px',
    backgroundColor: '#f3f4f6',
    minHeight: '100vh',
  };

  const headingStyle: React.CSSProperties = {
    fontSize: '2.25rem',
    fontWeight: 'bold',
    marginBottom: '24px',
    color: '#1f2937',
    textAlign: 'center',
  };

  const tabsContainerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    gap: '16px',
    marginBottom: '24px',
  };

  const tabButtonStyle: React.CSSProperties = {
    padding: '10px 24px',
    borderRadius: '8px',
    fontWeight: 500,
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  };

  const activeTabStyle: React.CSSProperties = {
    ...tabButtonStyle,
    backgroundColor: '#3b82f6',
    color: '#fff',
    boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
  };

  const inactiveTabStyle: React.CSSProperties = {
    ...tabButtonStyle,
    backgroundColor: '#e5e7eb',
    color: '#374151',
  };

  const contentBoxStyle: React.CSSProperties = {
    backgroundColor: '#fff',
    padding: '24px',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  };

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>Admin Panel</h1>

      {/* Tabs */}
      <div style={tabsContainerStyle}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            style={activeTab === tab.id ? activeTabStyle : inactiveTabStyle}
            onClick={() => handleTabChange(tab.id)}
            onMouseEnter={(e) => {
              if (activeTab !== tab.id) {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#d1d5db';
              }
            }}
            onMouseLeave={(e) => {
              if (activeTab !== tab.id) {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#e5e7eb';
              }
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div ref={contentRef} style={contentBoxStyle}>
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'users' && <UsersList />}
        {activeTab === 'stores' && <StoresList />}
      </div>
    </div>
  );
};

export default AdminPage;
