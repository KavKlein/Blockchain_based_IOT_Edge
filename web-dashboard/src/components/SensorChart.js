import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function SensorChart({ data }) {
  // Separate data by type
  const distanceData = data.filter(d => d.dataType === 'distance');
  const temperatureData = data.filter(d => d.dataType === 'temperature');
  const humidityData = data.filter(d => d.dataType === 'humidity');
  
  // Merge all data by timestamp for the chart
  const allTimestamps = [...new Set(data.map(d => d.timestamp))].sort().slice(-20);
  
  const chartData = allTimestamps.map(timestamp => {
    const distanceEntry = distanceData.find(d => d.timestamp === timestamp);
    const tempEntry = temperatureData.find(d => d.timestamp === timestamp);
    const humidityEntry = humidityData.find(d => d.timestamp === timestamp);
    
    return {
      time: new Date(timestamp * 1000).toLocaleTimeString(),
      distance: distanceEntry ? distanceEntry.value : null,
      temperature: tempEntry ? tempEntry.value : null,
      humidity: humidityEntry ? humidityEntry.value : null
    };
  });

  return (
    <div style={{ background: 'white', borderRadius: '10px', padding: '20px', marginBottom: '20px' }}>
      <h2>Sensor Data Over Time (Last 20 readings)</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="distance" 
            stroke="#ff5722" 
            name="Distance (cm)" 
            connectNulls 
          />
          <Line 
            type="monotone" 
            dataKey="temperature" 
            stroke="#2196f3" 
            name="Temperature (°C)" 
            connectNulls 
          />
          <Line 
            type="monotone" 
            dataKey="humidity" 
            stroke="#4caf50" 
            name="Humidity (%)" 
            connectNulls 
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default SensorChart;