import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ActiveAlerts = () => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const res = await axios.get('http://localhost:8080/api/alerts');
        setAlerts(res.data.reverse().slice(0, 20)); // show recent first
      } catch (err) {
        console.error("Error fetching alerts:", err);
      }
    };

    fetchAlerts();
    const interval = setInterval(fetchAlerts, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Active Alerts</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead style={{ backgroundColor: '#f1f5f9' }}>
          <tr>
            <th style={th}>Time</th>
            <th style={th}>Server</th>
            <th style={th}>Severity</th>
            <th style={th}>Type</th>
            <th style={th}>Description</th>
          </tr>
        </thead>
        <tbody>
          {alerts.map((alert, idx) => (
            <tr key={idx}>
              <td style={td}>{new Date(alert.createdAt).toLocaleString()}</td>
              <td style={td}>Server-{alert.server.id}</td>
              <td style={{ ...td, color: getColor(alert.severity) }}>{alert.severity}</td>
              <td style={td}>{alert.alertType}</td>
              <td style={td}>{alert.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const getColor = (severity) => {
  switch (severity) {
    case 'HIGH': return 'red';
    case 'MEDIUM': return 'orange';
    case 'LOW': return 'green';
    default: return 'black';
  }
};

const th = {
  padding: '10px',
  textAlign: 'left',
  borderBottom: '2px solid #cbd5e1'
};

const td = {
  padding: '10px',
  borderBottom: '1px solid #e2e8f0'
};

export default ActiveAlerts;
