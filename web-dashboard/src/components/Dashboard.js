import React, { useState, useEffect } from 'react';
import { fetchAllSensorData, getDataCount } from '../utils/web3Config';
import NodeStatus from './NodeStatus';
import SensorChart from './SensorChart';
import TransactionList from './TransactionList';

function Dashboard() {
  const [data, setData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadData();
    // Refresh every 5 seconds
    const interval = setInterval(loadData, 5000);
    return () => clearInterval(interval);
  }, []);

  async function loadData() {
  try {
    const sensorData = await fetchAllSensorData();
    const count = await getDataCount();
    
    // DEBUG: Log what we got
    console.log('📊 Data received:', sensorData.length, 'entries');
    console.log('📊 Sample data:', sensorData.slice(-3));
    console.log('📊 Total count:', count);
    
    setData(sensorData);
    setTotalCount(count);
    setLoading(false);
    setError(null);
  } catch (err) {
    console.error('Error loading data:', err);
    setError('Failed to connect to blockchain. Is Ganache running?');
    setLoading(false);
  }
}



  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <h2>Loading blockchain data...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', padding: '50px', color: '#f44336' }}>
        <h2>⚠️ {error}</h2>
        <button onClick={loadData} style={{
          padding: '10px 20px',
          marginTop: '20px',
          background: '#2196f3',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}>
          Retry Connection
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <header style={{ marginBottom: '30px' }}>
        <h1>🔗 IoT Blockchain Dashboard</h1>
        <p style={{ color: '#666' }}>
          Decentralized sensor data logging via Ethereum
        </p>
        <p style={{ fontSize: '14px', color: '#999' }}>
          Total Transactions: <strong>{totalCount}</strong> | 
          Last Update: {new Date().toLocaleTimeString()}
        </p>
      </header>

      <NodeStatus data={data} />
      <SensorChart data={data} />
      <TransactionList data={data} />
    </div>
  );
}

export default Dashboard;