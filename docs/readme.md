

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [System Architecture](#system-architecture)
- [Hardware Requirements](#hardware-requirements)
- [Software Requirements](#software-requirements)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Troubleshooting](#troubleshooting)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)
- [License](#license)

---


---



---


---

## 📥 Installation

### 1. Clone Repository

```bash
git clone https://github.com/yourusername/Blockchain_based_IoT_Edge.git
cd Blockchain_based_IoT_Edge
```

### 2. Install Blockchain Tools

#### Install Ganache UI
Download from: https://trufflesuite.com/ganache/

#### Setup Hardhat Project

```bash
cd src/iot-blockchain-project
npm install
```

#### Deploy Smart Contract

```bash
npx hardhat compile
npx hardhat run scripts/deploy.js --network ganache
```

**Save the contract address displayed!**

### 3. Setup Gateway Service

```bash
cd ../iot-gateway
npm install
```

Create `.env` file:

```env
GANACHE_URL=http://127.0.0.1:7545
CONTRACT_ADDRESS=0xYourDeployedContractAddress
GATEWAY_PRIVATE_KEY=0xYourGanachePrivateKey
SERIAL_PORT=COM3
SERIAL_BAUD_RATE=9600
MQTT_BROKER=mqtt://localhost:1883
MQTT_TOPIC=iot/sensordata
```

### 4. Install MQTT Broker (Mosquitto)

**Windows:**
```bash
# Download from https://mosquitto.org/download/
# Install and configure mosquitto.conf
```

**Linux/Mac:**
```bash
sudo apt-get install mosquitto mosquitto-clients
# or
brew install mosquitto
```

**Configure `mosquitto.conf`:**
```conf
listener 1883 0.0.0.0
allow_anonymous true
```

### 5. Setup Web Dashboard

```bash
cd ../web-dashboard
npm install
```

Update `src/utils/web3Config.js` with your contract address.

### 6. Upload Firmware to Hardware

#### Arduino Uno
1. Open `src/arduino-code/arduino_uno_sensor.ino`
2. Tools → Board → Arduino Uno
3. Tools → Port → Select COM port
4. Upload

#### ESP32
1. Open `src/arduino-code/esp32_wifi_mqtt.ino`
2. Update WiFi credentials and MQTT broker IP
3. Tools → Board → ESP32 Dev Module
4. Upload

---

## ⚙️ Configuration

### Smart Contract Configuration

Edit `hardhat.config.js`:

```javascript
module.exports = {
  solidity: "0.8.19",
  networks: {
    ganache: {
      url: "http://127.0.0.1:7545",
      accounts: ["0xYourPrivateKey"],
      chainId: 1337
    }
  }
};
```

### Gateway Configuration

`.env` file parameters:

| Variable | Description | Example |
|----------|-------------|---------|
| `GANACHE_URL` | Ganache RPC endpoint | `http://127.0.0.1:7545` |
| `CONTRACT_ADDRESS` | Deployed contract address | `0x5FbDB...` |
| `GATEWAY_PRIVATE_KEY` | Account private key | `0xac097...` |
| `SERIAL_PORT` | Arduino COM port | `COM3` or `/dev/ttyACM0` |
| `SERIAL_BAUD_RATE` | Serial speed | `9600` |
| `MQTT_BROKER` | MQTT broker URL | `mqtt://localhost:1883` |
| `MQTT_TOPIC` | MQTT topic name | `iot/sensordata` |

### ESP32 Configuration

Update in `esp32_wifi_mqtt.ino`:

```cpp
const char* SSID = "YourWiFiName";
const char* PASSWORD = "YourWiFiPassword";
const char* MQTT_BROKER = "192.168.1.100";  // Your laptop IP
```

---

## 🚀 Usage

### Start the System

**Terminal 1 - Ganache:**
```bash
# Open Ganache UI and start workspace
```

**Terminal 2 - Mosquitto:**
```bash
cd D:\Softwares\mosquitto
mosquitto -c mosquitto.conf -v
```

**Terminal 3 - Gateway:**
```bash
cd src/iot-gateway
node gateway.js
```

**Terminal 4 - Dashboard:**
```bash
cd src/web-dashboard
npm start
```

### Expected Output

**Gateway Terminal:**
```
🚀 IoT Gateway Service Starting...
📡 Gateway Address: 0x...
🔌 Serial Port Connected (Arduino Uno)
📡 MQTT Broker Connected (ESP32)

📨 [SERIAL] Data received from Arduino: {...}
✅ Success! TX Hash: 0x...

📨 [MQTT] Data received from ESP32: {...}
✅ Success! TX Hash: 0x...
```

**Dashboard:**
- Open browser at `http://localhost:3000`
- View real-time charts and transaction history
- Monitor node status (online/offline)

---


```

---

## 🐛 Troubleshooting

### Common Issues

#### 1. Serial Port Error
```
Error: "path" is not defined: undefined
```
**Solution:**
- Check `.env` has correct `SERIAL_PORT=COMX`
- Close Arduino Serial Monitor (port conflict)
- Verify Arduino is connected (Device Manager)

#### 2. ESP32 MQTT Connection Failed (rc=-2)
```
❌ Failed, rc=-2 Retrying...
```
**Solution:**
- Update `MQTT_BROKER` with correct laptop IP (`ipconfig`)
- Configure `mosquitto.conf` to allow remote connections
- Check Windows Firewall (allow port 1883)

#### 3. Dashboard Can't Connect to Ganache
```
Failed to connect to blockchain
```
**Solution:**
- Verify Ganache is running on port 7545
- Update `CONTRACT_ADDRESS` in `web3Config.js`
- Check contract is deployed (`deployment-info.json`)

#### 4. Gateway Not Receiving Data
**Solution:**
- Restart gateway after configuration changes
- Verify MCUs are powered and running
- Check serial/MQTT broker logs

---



---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines
- Follow ESLint configuration
- Add tests for new features
- Update documentation
- Use meaningful commit messages

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👥 Authors

- **Your Name** - *Initial work* - [YourGitHub](https://github.com/yourusername)

---

## 🙏 Acknowledgments

- Ethereum Foundation for blockchain technology
- Arduino and Espressif for hardware platforms
- Eclipse Mosquitto for MQTT broker
- Truffle Suite for Ganache
- React and Recharts communities

---

## 📊 Project Statistics

![GitHub stars](https://img.shields.io/github/stars/yourusername/Blockchain_based_IoT_Edge)
![GitHub forks](https://img.shields.io/github/forks/yourusername/Blockchain_based_IoT_Edge)
![GitHub issues](https://img.shields.io/github/issues/yourusername/Blockchain_based_IoT_Edge)

---

## 📞 Contact

For questions or support, please open an issue or contact:
- Email: your.email@example.com
- LinkedIn: [Your Profile](https://linkedin.com/in/yourprofile)
- Project Link: https://github.com/yourusername/Blockchain_based_IoT_Edge

---

**⭐ If you find this project useful, please consider giving it a star!**