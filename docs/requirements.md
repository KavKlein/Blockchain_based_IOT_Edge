## 🔧 Requirements

### Required Components

| Component         | Specification        | Purpose                        |
|-------------------|----------------------|--------------------------------|
| Arduino Uno       | ATmega328P           | Wired IoT node (Serial)        |
| ESP32 Dev Board   | ESP-WROOM-32         | Wireless IoT node (WiFi/MQTT)  |
| Ultrasonic Sensor | HC-SR04              | Distance measurement (Arduino) |
| DHT11/DHT22       | Temperature/Humidity | Environmental sensing (ESP32)  |
| USB Cable         | Type-A to Type-B     | Arduino programming/data       |
| Micro USB Cable   |         -            | ESP32 programming/power        |
| Breadboard        |         -            | Circuit prototyping            |
| Jumper Wires      | M-M, M-F             | Connections                    |

### Optional Components
- Power supply (5V/3.3V)
- Additional sensors (LDR, gas, motion, etc.)
- External antenna for ESP32 (better WiFi range)

---

## 💻 Software Requirements

### Development Tools
- **Node.js** v16+ and npm
- **Arduino IDE** v1.8+ or v2.x
- **Ganache UI** v2.7+ (Ethereum testnet)
- **Git** (version control)
- **VS Code** or any code editor

### Node.js Packages
```json
{
  "hardhat": "^2.19.0",
  "web3": "^4.3.0",
  "serialport": "^12.0.0",
  "mqtt": "^5.3.0",
  "dotenv": "^16.3.0",
  "react": "^18.2.0",
  "recharts": "^2.10.0"
}
```

### Arduino Libraries
- **PubSubClient** (MQTT for ESP32)
- **WiFi.h** (ESP32 built-in)
- **DHT sensor library** (optional)
