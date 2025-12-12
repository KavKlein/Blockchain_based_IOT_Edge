## 📁 Project Structure

```
Blockchain_based_IoT_Edge/

├── Blockchain_based_IOT_Projects/      # Smart contracts & deployment
│   ├── contracts/
│   │   └── IoTDataLogger.sol    # Main smart contract
│   ├── scripts/
│   │   ├── deploy.js            # Deployment script
│   │   └── test-contract.js     # Testing script
│   ├── hardhat.config.js        # Hardhat configuration
│   └── package.json
│
├── iot-gateway/                 # Gateway service
│   ├── gateway.js               # Main gateway logic
│   ├── test-gateway.js          # MQTT test simulator
│   ├── .env                     # Configuration
│   ├── contract-abi.json        # Contract interface
│   └── package.json
│
├── MCU_nodes/                # MCU firmware
│   ├── arduino_uno_sensor.ino   # Arduino code
│   └── esp32_wifi_mqtt.ino      # ESP32 code
│
└── web-dashboard/               # React dashboard
|   ├── src/
|   │   ├── App.js
|   │   ├── components/
|   │   │   ├── Dashboard.js
|   │   │   ├── NodeStatus.js
|   │   │   ├── SensorChart.js
|   │   │   └── TransactionList.js
|   │   └── utils/
|   │       └── web3Config.js
|   └── package.json
|
├── docs
├── LICENSE
└── .gitignore