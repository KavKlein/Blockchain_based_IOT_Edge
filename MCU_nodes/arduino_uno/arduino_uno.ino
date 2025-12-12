/*
 * Arduino Uno - IoT Blockchain Node
 * Sends sensor data via Serial to Gateway
 * Protocol: SERIAL (USB)
 */

#include <Arduino.h>

const String NODE_ID = "ARDUINO_UNO_01";
const int TRIG_PIN = 9;
const int ECHO_PIN = 10;
const long INTERVAL = 5000; // Send data every 5 seconds

unsigned long previousMillis = 0;

void setup() {
  Serial.begin(9600);
  pinMode(TRIG_PIN, OUTPUT);
  pinMode(ECHO_PIN, INPUT);

  // Ensure TRIG starts LOW
  digitalWrite(TRIG_PIN, LOW);
  
  // Wait for serial connection
  while (!Serial) {
    ; // Wait for serial port to connect
  }
  
  Serial.println("{\"status\":\"Arduino Uno IoT Node Ready\"}");
}

float readDistanceCM() {
  // Send 10us trigger pulse
  digitalWrite(TRIG_PIN, LOW);
  delayMicroseconds(2);
  digitalWrite(TRIG_PIN, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG_PIN, LOW);

  // Read echo time (µs)
  long duration = pulseIn(ECHO_PIN, HIGH, 30000UL); // 30ms timeout (~5m distance limit)

  // If out of range or timeout
  if (duration == 0) {
    return -1.0;  // Invalid reading
  }

  // Convert time to distance:
  // Speed of sound ≈ 0.0343 cm/µs
  float distance = (duration * 0.0343) / 2.0;

  return distance;
}

void loop() {
  unsigned long currentMillis = millis();
  
  // Send data at regular intervals
  if (currentMillis - previousMillis >= INTERVAL) {
    previousMillis = currentMillis;
    
    float distance = readDistanceCM();
    
    // Create JSON message
    Serial.print("{");
    Serial.print("\"nodeId\":\"");
    Serial.print(NODE_ID);
    Serial.print("\",\"type\":\"distance\",\"value\":");
     if (distance < 0) {
      Serial.print("\"OUT_OF_RANGE\"");
    } else {
      Serial.print(distance, 2);
    }
    Serial.print(",\"protocol\":\"SERIAL\"");
    Serial.println("}");
  }
}