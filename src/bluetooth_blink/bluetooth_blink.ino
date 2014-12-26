
char val;
char btVal;

int ledpin = 13;
int enPin  = 5;
int rxPin  = 15;
int txPin  = 14;

#include <SoftwareSerial.h>

SoftwareSerial BTSerial(rxPin, txPin); // RX | TX

void setup() {
  pinMode(ledpin, OUTPUT);
  
  pinMode(rxPin, INPUT);
  pinMode(txPin, OUTPUT);
  
  // set EN pin
  pinMode(enPin, OUTPUT);
  digitalWrite(enPin, HIGH);
  
  /*
  BTSerial.begin(115200);  // The Bluetooth Mate defaults to 115200bps
  BTSerial.print("$");  // Print three times individually
  BTSerial.print("$");
  BTSerial.print("$");  // Enter command mode
  */
  
  BTSerial.begin(9600);
  
  Serial.begin(115200);
}
 
void loop() {
  val   = Serial.read();  
  btVal = BTSerial.read();
  
  
  if (val == '0' || btVal == '0') {
    digitalWrite(ledpin, LOW);
    delay(400);
    Serial.println("off");
    BTSerial.println("off");
  }
  if (val == '1' || btVal == '1') { 
    digitalWrite(ledpin, HIGH);
    delay(400);
    Serial.println("on");
    BTSerial.println("off");
  }
  
  
  if (btVal && btVal >= 0) {
    Serial.write("new Value:");
    Serial.println(btVal);
  }
  if (val && val >= 0) {
    BTSerial.println(val);
  }

  delay(200);
}

