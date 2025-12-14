# Blockchain-Based IoT Edge Computing

A decentralized IoT system that securely collects sensor data from heterogeneous edge devices and logs it immutably on an Ethereum blockchain, with real-time visualization via a web dashboard.

This repository contains the **full working implementation** of a blockchain-secured IoT edge architecture using Arduino, ESP32, Ethereum smart contracts, a Node.js gateway, and a React dashboard.

> 📘 **Detailed architecture, configurations, and troubleshooting are documented in the `/docs` folder.**

---

## 🎯 Overview

This project demonstrates how blockchain can be used as a **decentralized security and trust layer** for IoT systems.

### Data Sources
- **Arduino Uno (wired node)**  
  Sends sensor data via **Serial/USB**
- **ESP32 (wireless node)**  
  Sends sensor data via **WiFi / MQTT**

### Core Pipeline
IoT Sensors → Gateway (Node.js) → Ethereum Smart Contract → Web Dashboard

---

### Key Objective
Ensure **data integrity, non-repudiation, and transparent auditability** for IoT sensor networks by removing centralized trust dependencies.

---

## ✨ Key Features

### 🔐 Blockchain & Security
- Immutable sensor data storage on Ethereum
- Smart contract–based logging
- Transparent transaction history
- Tamper-proof audit trail
- No single point of failure

### 🔌 Multi-Protocol IoT Support
- Serial communication (Arduino Uno)
- MQTT over WiFi (ESP32)
- Protocol-agnostic gateway design
- Easily extensible to new protocols

### 📊 Real-Time Monitoring
- Live React dashboard
- Sensor charts and transaction history
- Node online/offline status
- Auto-refresh every 5 seconds

### 📈 Scalability
- Multiple sensor nodes supported
- Multiple sensor types per node
- Efficient numeric encoding (2-decimal precision)

---


