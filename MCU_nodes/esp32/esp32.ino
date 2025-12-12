/*
 * ESP32 - IoT Blockchain Node
 * Sends sensor data via WiFi/MQTT to Gateway
 * Protocol: WIFI_MQTT
 */

#include <WiFi.h>
#include <PubSubClient.h>
#include <DHT.h>

#define SENSOR_PIN 4        // GPIO pin connected to DHT11 data pin
#define DHTTYPE DHT11   // DHT11 sensor type

// WiFi credentials
const char* SSID = "GalaxyA12E4D7";
const char* PASSWORD = "123456789";

// MQTT Broker (your laptop IP running the gateway)
const char* MQTT_BROKER = "192.168.45.253";  
const int MQTT_PORT = 1883;
const char* MQTT_TOPIC = "iot/sensordata";

// Node configuration
const String NODE_ID = "ESP32_01";
const long INTERVAL = 5000; // Send data every 5 seconds

DHT dht(SENSOR_PIN, DHTTYPE);

WiFiClient espClient;
PubSubClient mqttClient(espClient);
unsigned long previousMillis = 0;

//FUNCTION DECLARATIONS
void setupWiFi();
void reconnectMQTT();

void setup() {
  Serial.begin(115200);
  pinMode(SENSOR_PIN, INPUT);
  
  Serial.println("\n🚀 ESP32 IoT Blockchain Node Starting...");
  
  // Connect to WiFi
  setupWiFi();
  
  // Setup MQTT
  mqttClient.setServer(MQTT_BROKER, MQTT_PORT);
  
  Serial.println("✅ ESP32 Ready!");
}

void setupWiFi() {
  Serial.print("📡 Connecting to WiFi: ");
  Serial.println(SSID);
  
  WiFi.begin(SSID, PASSWORD);
  
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  
  Serial.println("\n✅ WiFi Connected!");
  Serial.print("   IP Address: ");
  Serial.println(WiFi.localIP());
}

void reconnectMQTT() {
  while (!mqttClient.connected()) {
    Serial.print("📡 Connecting to MQTT Broker...");
    
    if (mqttClient.connect(NODE_ID.c_str())) {
      Serial.println(" ✅ Connected!");
    } else {
      Serial.print(" ❌ Failed, rc=");
      Serial.print(mqttClient.state());
      Serial.println(" Retrying in 5 seconds...");
      delay(5000);
    }
  }
}

void loop() {
  // Ensure MQTT connection
  if (!mqttClient.connected()) {
    reconnectMQTT();
  }
  mqttClient.loop();
  
  // Send sensor data at intervals
  unsigned long currentMillis = millis();
  
  if (currentMillis - previousMillis >= INTERVAL) {
    previousMillis = currentMillis;
    
     // Read DHT11 sensor
    float humidity = dht.readHumidity();
    float temperature = dht.readTemperature(); // Celsius
    
    // Check if readings failed
    if (isnan(humidity) || isnan(temperature)) {
      Serial.println("❌ Failed to read from DHT11 sensor!");
      return;
    }

    
    // Create JSON payload
    // MESSAGE 1: Send temperature
    String tempPayload = "{";
    tempPayload += "\"nodeId\":\"" + NODE_ID + "\",";
    tempPayload += "\"type\":\"temperature\",";
    tempPayload += "\"value\":" + String(temperature, 2) + ",";
    tempPayload += "\"protocol\":\"WIFI_MQTT\"";
    tempPayload += "}";
    
    if (mqttClient.publish(MQTT_TOPIC, tempPayload.c_str())) {
      Serial.println("📤 Temperature sent: " + String(temperature, 2) + "°C");
    }
    
    delay(500); // Small delay between messages
    
    // MESSAGE 2: Send humidity
    String humPayload = "{";
    humPayload += "\"nodeId\":\"" + NODE_ID + "\",";
    humPayload += "\"type\":\"humidity\",";
    humPayload += "\"value\":" + String(humidity, 2) + ",";
    humPayload += "\"protocol\":\"WIFI_MQTT\"";
    humPayload += "}";
    
    if (mqttClient.publish(MQTT_TOPIC, humPayload.c_str())) {
      Serial.println("📤 Humidity sent: " + String(humidity, 2) + "%");
    }
  }
}