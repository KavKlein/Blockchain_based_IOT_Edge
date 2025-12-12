## 🐛 Troubleshooting

### Common Issues Encountered durng development

#### 1. Serial Port Error
```
Error: "path" is not defined: undefined
```
**Solution:**
- Check `.env` has correct `SERIAL_PORT=COMX`
- Close Arduino Serial Monitor (port conflict with multiple access calls)
- Verify Arduino is connected and the firmware places it as an Atmega Device with a COM Port(Device Manager)

#### 2. ESP32 MQTT Connection Failed (rc=-2)
```
❌ Failed, rc=-2 Retrying...
```
**Solution:**
- Update `MQTT_BROKER` with correct laptop IP (`ipconfig`)
- Configure `mosquitto.conf` to allow remote connections and run the mqtt broker facilitate dwith the config file.
- Check Windows Firewall (allow port 1883)

#### 3. Dashboard Can't Connect to Ganache
```
Failed to connect to blockchain
```
**Solution:**
- Verify Ganache is running on port 7545
- Update `CONTRACT_ADDRESS` in `web3Config.js`
- Check contract is deployed in the logs(`deployment-info.json`)

#### 4. Gateway Not Receiving Data
**Solution:**
- Restart gateway after configuration changes
- Verify MCUs are powered and running
- Check serial/MQTT broker logs (see if it is running as a service in the taskmanager, observe the logs to see the transactions are taking place)

#### 5. Powershell Errors
**Solution:**
- Specify global or local installations
- Check if the software versions are compatible with each other
- Set the access path of softwares in environmental variables when necessary if some commands aren't identified inside the specific location that libraryies and depedancies are installed.


