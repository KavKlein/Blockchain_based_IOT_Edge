## 🏗️ System Architecture

```
┌──────────────┐ Serial/USB   ┌──────────────┐
│ Arduino Uno  │─────────────→│              │
│  (Distance)  │   9600 baud  │   Gateway    │
└──────────────┘              │  (Node.js)   │      ┌─────────────┐
                              │              │─────→│  Ganache    │
┌──────────────┐ WiFi/MQTT    │   Web3.js    │      │  Testnet    │
│    ESP32     │─────────────→│   Bridge     │      │ (Blockchain)│
│ (Temp/Humid) │  Port 1883   │              │      └─────────────┘
└──────────────┘              └──────────────┘             │
                                                           │
                                                    ┌──────────────┐
                                                    │     Web      │
                                                    │  Dashboard   │
                                                    │ (React/Web3) │
                                                    └──────────────┘
```

### Data Flow

1. **Sensor Reading** → MCU reads sensor value
2. **JSON Encoding** → Data formatted as JSON
3. **Protocol Transport** → Sent via Serial or MQTT
4. **Gateway Reception** → Node.js receives and validates
5. **Blockchain Transaction** → Smart contract `logData()` called
6. **Block Mining** → Transaction mined on Ganache
7. **Dashboard Update** → Web3.js fetches latest data
8. **Visualization** → Charts and tables updated