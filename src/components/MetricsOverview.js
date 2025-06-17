import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const MetricsOverview = ({ serverId = 1 }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/metrics/${serverId}`);
        const formatted = response.data.map(m => ({
          time: new Date(m.timestamp).toLocaleTimeString(),
          CPU: m.metricType === "CPU" ? m.value : null,
          MEMORY: m.metricType === "MEMORY" ? m.value : null,
          DISK: m.metricType === "DISK_USAGE" ? m.value : null
        }));
        

        // Merge CPU/MEMORY/DISK by time
        const merged = [];
        const map = {};

        for (const entry of formatted) {
          if (!entry.time) continue;
          if (!map[entry.time]) map[entry.time] = { time: entry.time };

          if (entry.CPU !== null) map[entry.time].CPU = entry.CPU;
          if (entry.MEMORY !== null) map[entry.time].MEMORY = entry.MEMORY;
          if (entry.DISK !== null) map[entry.time].DISK = entry.DISK;
        }

        for (const key in map) {
          merged.push(map[key]);
        }

        setData(merged.slice(-20));
        console.log("📊 Final data passed to chart:", merged.slice(-20));
 // Last 20 entries
      } catch (err) {
        console.error("Failed to fetch metrics:", err);
      }
    };

    fetchMetrics();
    const interval = setInterval(fetchMetrics, 10000);
    return () => clearInterval(interval);
  }, [serverId]);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Metrics Overview (Server {serverId})</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis unit="%" domain={[0, 100]} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="CPU" stroke="#ef4444" />
          <Line type="monotone" dataKey="MEMORY" stroke="#3b82f6" />
          <Line type="monotone" dataKey="DISK" stroke="#10b981" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MetricsOverview;
