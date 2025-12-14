import React from 'react';
import { Cable, Wifi } from 'lucide-react';

function TransactionList({ data }) {
  const latest = data.slice(-10).reverse();

  return (
    <div style={{ background: 'white', borderRadius: '10px', padding: '20px' }}>
      <h2>Recent Transactions (Last 10)</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #ddd' }}>
            <th style={{ padding: '10px', textAlign: 'left' }}>Node</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>Type</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>Value</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>Protocol</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>Time</th>
          </tr>
        </thead>
        <tbody>
          {latest.map((entry, index) => (
            <tr key={index} style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '10px' }}>{entry.nodeId}</td>
              <td style={{ padding: '10px' }}>{entry.dataType}</td>
              <td style={{ padding: '10px', fontWeight: 'bold' }}>
                {entry.value.toFixed(2)}
                {entry.dataType === 'temperature' ? '°C' : entry.dataType === 'humidity' ? '%' : entry.dataType === 'distance' ? 'cm' : ''}
              </td>
              <td style={{ padding: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  {entry.protocol === 'SERIAL' ? (
                    <><Cable size={16} color="#ff5722" /> Serial</>
                  ) : (
                    <><Wifi size={16} color="#2196f3" /> MQTT</>
                  )}
                </div>
              </td>
              <td style={{ padding: '10px', fontSize: '12px', color: '#666' }}>
                {new Date(entry.timestamp * 1000).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionList;