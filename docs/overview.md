## 🎯 Overview

This project implements a **decentralized IoT architecture** where:
- **Arduino Uno** (wired node) sends sensor data via Serial/USB
- **ESP32** (wireless node) sends sensor data via WiFi/MQTT
- **Gateway Service** bridges both protocols to the blockchain
- **Ethereum Smart Contract** provides immutable data logging
- **Web Dashboard** visualizes real-time blockchain data

**Key Innovation:** Using blockchain as a decentralized security layer ensures data integrity, non-repudiation, and transparent audit trails for IoT sensor networks.

---

## ✨ Features

### Blockchain & Security
- ✅ Immutable sensor data storage on Ethereum
- ✅ Smart contract-based access control
- ✅ Transparent transaction history
- ✅ Tamper-proof audit logs
- ✅ Decentralized architecture (no single point of failure)

### Multi-Protocol Support
- ✅ **Serial Communication** (Arduino Uno via USB)
- ✅ **MQTT Protocol** (ESP32 via WiFi)
- ✅ Protocol-agnostic gateway design
- ✅ Easy to add new communication protocols

### Real-Time Monitoring
- ✅ Live web dashboard with charts
- ✅ Node status indicators (online/offline)
- ✅ Transaction history viewer
- ✅ Auto-refresh every 5 seconds

### Scalability
- ✅ Add unlimited IoT nodes
- ✅ Support for multiple sensor types
- ✅ Efficient data encoding (2 decimal precision)
