import React from 'react';

const Header = () => {
  return (
    <header style={{ 
      padding: '20px', 
      backgroundColor: '#1e293b', 
      color: '#fff', 
      textAlign: 'center', 
      borderBottom: '2px solid #0ea5e9' 
    }}>
      <h1 style={{ fontSize: '2.5rem', margin: 0 }}>InfraWatch</h1>
      <p style={{ marginTop: '10px', fontSize: '1.1rem', color: '#cbd5e1' }}>
        Real-Time Infrastructure Monitoring Dashboard
      </p>
    </header>
  );
};

export default Header;
