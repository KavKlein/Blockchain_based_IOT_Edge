import React from 'react';
import { Wifi, Cable, Activity } from 'lucide-react';

function NodeStatus({ data }) {
  // Get latest data for each node
  const arduinoData = data.filter(d => d.protocol === 'SERIAL').slice(-1)[0];
  const esp32Temp = data.filter(d => d.protocol === 'WIFI_MQTT' && d.dataType === 'temperature').slice(-1)[0];
  const esp32Humidity = data.filter(d => d.protocol === 'WIFI_MQTT' && d.dataType === 'humidity').slice(-1)[0];
  
  // Check if node is active (data within last 30 seconds)
  //const isActive = (nodeData) => !!nodeData;

  const isActive = (nodeData) => {
    if (!nodeData) return false;
    const now = Math.floor(Date.now() / 1000);
    return (now - nodeData.timestamp) < 20;
  };
  

  /*
  console.log(
  'NOW:',
  Math.floor(Date.now() / 1000),
  'LAST:',
  nodeData?.timestamp,
  'DELTA:',
  Math.floor(Date.now() / 1000) - nodeData?.timestamp
);
*/
  
  // ESP32 is online if either temp or humidity is recent
  const esp32Active = isActive(esp32Temp) || isActive(esp32Humidity);
  
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
      {/* Arduino Uno */}
      <div style={{
        background: isActive(arduinoData) ? '#e8f5e9' : '#ffebee',
        border: `2px solid ${isActive(arduinoData) ? '#4caf50' : '#f44336'}`,
        borderRadius: '10px',
        padding: '20px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
          <Cable size={24} color={isActive(arduinoData) ? '#4caf50' : '#f44336'} />
          <h3 style={{ margin: 0 }}>Arduino Uno</h3>
          <Activity 
            size={16} 
            color={isActive(arduinoData) ? '#4caf50' : '#ccc'}
            style={{ marginLeft: 'auto' }}
          />
        </div>
        <p style={{ margin: '5px 0', fontSize: '14px', color: '#666' }}>
          Sensor: HC-SR04 Ultrasonic
        </p>
        <p style={{ margin: '5px 0', fontSize: '14px', color: '#666' }}>
          Protocol: SERIAL (USB)
        </p>
        {arduinoData && (
          <>
            <p style={{ margin: '5px 0', fontSize: '18px', fontWeight: 'bold' }}>
              {arduinoData.value.toFixed(2)} cm
            </p>
            <p style={{ margin: '5px 0', fontSize: '12px', color: '#999' }}>
              {new Date(arduinoData.timestamp * 1000).toLocaleTimeString()}
            </p>
          </>
        )}
        <p style={{ 
          margin: '10px 0 0 0', 
          fontSize: '12px', 
          fontWeight: 'bold',
          color: isActive(arduinoData) ? '#4caf50' : '#f44336'
        }}>
          {isActive(arduinoData) ? '● ONLINE' : '○ OFFLINE'}
        </p>
      </div>

      {/* ESP32 */}
      <div style={{
        background: esp32Active ? '#e3f2fd' : '#ffebee',
        border: `2px solid ${esp32Active ? '#2196f3' : '#f44336'}`,
        borderRadius: '10px',
        padding: '20px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
          <Wifi size={24} color={esp32Active ? '#2196f3' : '#f44336'} />
          <h3 style={{ margin: 0 }}>ESP32</h3>
          <Activity 
            size={16} 
            color={esp32Active ? '#2196f3' : '#ccc'}
            style={{ marginLeft: 'auto' }}
          />
        </div>
        <p style={{ margin: '5px 0', fontSize: '14px', color: '#666' }}>
          Sensor: DHT11
        </p>
        <p style={{ margin: '5px 0', fontSize: '14px', color: '#666' }}>
          Protocol: WiFi/MQTT
        </p>
        {esp32Temp && (
          <p style={{ margin: '5px 0', fontSize: '16px' }}>
            🌡️ {esp32Temp.value.toFixed(1)}°C
          </p>
        )}
        {esp32Humidity && (
          <p style={{ margin: '5px 0', fontSize: '16px' }}>
            💧 {esp32Humidity.value.toFixed(1)}%
          </p>
        )}
        {(esp32Temp || esp32Humidity) && (
          <p style={{ margin: '5px 0', fontSize: '12px', color: '#999' }}>
            {new Date((esp32Temp?.timestamp || esp32Humidity?.timestamp) * 1000).toLocaleTimeString()}
          </p>
        )}
        <p style={{ 
          margin: '10px 0 0 0', 
          fontSize: '12px', 
          fontWeight: 'bold',
          color: esp32Active ? '#2196f3' : '#f44336'
        }}>
          {esp32Active ? '● ONLINE' : '○ OFFLINE'}
        </p>
      </div>
    </div>
  );
}

export default NodeStatus;