import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ServerHealthTable = () => {
  const [servers, setServers] = useState([]);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const serverIds = [1, 3]; // Example IDs, adjust as needed
        const responses = await Promise.all(
          serverIds.map(id => axios.get(`http://localhost:8080/api/metrics/${id}`))
        );

        const serverData = responses.map((res, idx) => {
          const metrics = res.data;
          const latest = metrics[metrics.length - 1];
          const cpu = metrics.find(m => m.metricType === "CPU")?.value || 0;
          const memory = metrics.find(m => m.metricType === "MEMORY")?.value || 0;

          return {
            id: serverIds[idx],
            name: `Server-${serverIds[idx]}`,
            cpu,
            memory,
            status: cpu > 90 || memory > 90 ? "DEGRADED" : "ONLINE"
          };
        });

        setServers(serverData);
      } catch (error) {
        console.error("Error fetching metrics:", error);
      }
    };

    fetchMetrics();
    const interval = setInterval(fetchMetrics, 10000); // Refresh every 10s
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Server Health</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead style={{ backgroundColor: '#f1f5f9' }}>
          <tr>
            <th style={th}>Server</th>
            <th style={th}>CPU Usage (%)</th>
            <th style={th}>Memory Usage (%)</th>
            <th style={th}>Status</th>
          </tr>
        </thead>
        <tbody>
          {servers.map(server => (
            <tr key={server.id}>
              <td style={td}>{server.name}</td>
              <td style={td}>{server.cpu}</td>
              <td style={td}>{server.memory}</td>
              <td style={{ ...td, color: server.status === "ONLINE" ? "green" : "orange" }}>
                {server.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
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

export default ServerHealthTable;
