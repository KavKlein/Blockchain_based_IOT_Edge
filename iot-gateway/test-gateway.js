const mqtt = require('mqtt');

// Simulate ESP32 sending data
const client = mqtt.connect('mqtt://localhost:1883');

client.on('connect', () => {
  console.log('✅ Test client connected to MQTT broker');
  
  // Simulate sensor data
  const testData = {
    nodeId: "ESP32_TEST_01",
    type: "humidity",
    value: 65.5,
    protocol: "WIFI_MQTT"
  };
  
  console.log('📤 Publishing test data:', testData);
  client.publish('iot/sensordata', JSON.stringify(testData));
  
  setTimeout(() => {
    client.end();
    console.log('✅ Test complete');
  }, 1000);
});