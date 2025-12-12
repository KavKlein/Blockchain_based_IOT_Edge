const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

// Add debug logging
console.log('DEBUG: Loading .env from:', path.join(__dirname, '.env'));
console.log('DEBUG: GANACHE_URL =', process.env.GANACHE_URL);
console.log('DEBUG: CONTRACT_ADDRESS =', process.env.CONTRACT_ADDRESS);
console.log('');
const {Web3} = require('web3');
const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');
const mqtt = require('mqtt');
const fs = require('fs');

// ============================================
// CONFIGURATION
// ============================================

//const web3 = new Web3(process.env.GANACHE_URL);
const web3 = new Web3(new Web3.providers.HttpProvider(process.env.GANACHE_URL));
const contractABI = JSON.parse(fs.readFileSync('contract-abi.json', 'utf8'));
const contract = new web3.eth.Contract(contractABI, process.env.CONTRACT_ADDRESS);

const gatewayAccount = web3.eth.accounts.privateKeyToAccount(process.env.GATEWAY_PRIVATE_KEY);
web3.eth.accounts.wallet.add(gatewayAccount);

console.log('🚀 IoT Gateway Service Starting...\n');
console.log('📡 Gateway Address:', gatewayAccount.address);
console.log('📜 Contract Address:', process.env.CONTRACT_ADDRESS);
console.log('🔗 Ganache URL:', process.env.GANACHE_URL);
console.log('─'.repeat(60));

// ============================================
// BLOCKCHAIN LOGGING FUNCTION
// ============================================

async function logToBlockchain(sensorData) {
  try {
    const { nodeId, type, value, protocol } = sensorData;
    
    // Convert float to integer (multiply by 100 for 2 decimal precision)
    const intValue = Math.floor(parseFloat(value) * 100);
    
    console.log(`\n📝 Logging to blockchain...`);
    console.log(`   Node: ${nodeId}`);
    console.log(`   Type: ${type}`);
    console.log(`   Value: ${value} (stored as ${intValue})`);
    console.log(`   Protocol: ${protocol}`);
    
    // Send transaction
    const receipt = await contract.methods
      .logData(nodeId, type, intValue, protocol)
      .send({
        from: gatewayAccount.address,
        gas: 500000
      });
    
    console.log(`✅ Success! TX Hash: ${receipt.transactionHash}`);
    console.log(`   Gas Used: ${receipt.gasUsed}`);
    console.log(`   Block: ${receipt.blockNumber}`);
    
    return receipt;
    
  } catch (error) {
    console.error('❌ Blockchain Error:', error.message);
    return null;
  }
}

// ============================================
// SERIAL PORT (Arduino Uno)
// ============================================

let serialPort;
let serialParser;

//try {
//  serialPort = new SerialPort(process.env.SERIAL_PORT, {
//    baudRate: parseInt(process.env.SERIAL_BAUD_RATE)
 // });

 try {
  const { SerialPort } = require('serialport');
  const { ReadlineParser } = require('@serialport/parser-readline');
  
  // Hardcoded for now - will fix .env later
  const COM_PORT = 'COM4';
  const BAUD_RATE = 9600;
  
  console.log(`\n🔌 Attempting Serial connection on ${COM_PORT}...`);
  
  serialPort = new SerialPort({
    path: COM_PORT,
    baudRate: BAUD_RATE
  });
  
  serialParser = serialPort.pipe(new ReadlineParser({ delimiter: '\n' }));
  
  serialPort.on('open', () => {
    console.log('\n🔌 Serial Port Connected (Arduino Uno)');
    console.log(`   Port: ${COM_PORT}`);
    console.log(`   Baud Rate: ${BAUD_RATE}`);
   // console.log(`   Port: ${process.env.SERIAL_PORT}`);
   // console.log(`   Baud Rate: ${process.env.SERIAL_BAUD_RATE}`);
  });
  
  serialParser.on('data', async (line) => {
    try {
      const data = JSON.parse(line.trim());
      console.log('\n📨 [SERIAL] Data received from Arduino:', data);
      await logToBlockchain(data);
    } catch (error) {
      console.error('❌ Serial Parse Error:', error.message);
      console.log('   Raw data:', line);
    }
  });
  
  serialPort.on('error', (err) => {
    console.error('❌ Serial Port Error:', err.message);
  });
  
} catch (error) {
  console.log('⚠️  Serial Port not available (Arduino not connected?)');
  console.log('   Error:', error.message);
}

// ============================================
// MQTT CLIENT (ESP32)
// ============================================

const mqttClient = mqtt.connect(process.env.MQTT_BROKER);

mqttClient.on('connect', () => {
  console.log('\n📡 MQTT Broker Connected (ESP32)');
  console.log(`   Broker: ${process.env.MQTT_BROKER}`);
  console.log(`   Topic: ${process.env.MQTT_TOPIC}`);
  
  mqttClient.subscribe(process.env.MQTT_TOPIC, (err) => {
    if (err) {
      console.error('❌ MQTT Subscribe Error:', err);
    } else {
      console.log(`✅ Subscribed to topic: ${process.env.MQTT_TOPIC}`);
    }
  });
});

mqttClient.on('message', async (topic, message) => {
  try {
    const data = JSON.parse(message.toString());
    console.log('\n📨 [MQTT] Data received from ESP32:', data);
    await logToBlockchain(data);
  } catch (error) {
    console.error('❌ MQTT Parse Error:', error.message);
    console.log('   Raw message:', message.toString());
  }
});

mqttClient.on('error', (error) => {
  console.error('❌ MQTT Connection Error:', error.message);
});

// ============================================
// GRACEFUL SHUTDOWN
// ============================================

process.on('SIGINT', () => {
  console.log('\n\n👋 Shutting down gateway...');
  
  if (serialPort && serialPort.isOpen) {
    serialPort.close();
  }
  
  if (mqttClient) {
    mqttClient.end();
  }
  
  process.exit(0);
});

console.log('\n✅ Gateway is running and waiting for sensor data...\n');