
char val;
char btVal;

int ledpin = 13;
int enPin  = 5;

#include <SoftwareSerial.h>

SoftwareSerial BTSerial(15, 14); // RX | TX

void setup() {
  pinMode(ledpin, OUTPUT);
  pinMode(enPin, OUTPUT);
  
  digitalWrite(enPin, HIGH);
  
  BTSerial.begin(115200);  // The Bluetooth Mate defaults to 115200bps
  BTSerial.print("$");  // Print three times individually
  BTSerial.print("$");
  BTSerial.print("$");  // Enter command mode
  BTSerial.begin(9600);
  Serial.begin(115200);
}
 
void loop() {
  val   = Serial.read();  
  btVal = BTSerial.read();
  
  if (val == '0') {              // if '0' was received led 13 is switched off
    digitalWrite(ledpin, LOW);    // turn Off pin 13 off
    delay(1000);                  // waits for a second   
    Serial.println("13 off");
  }
  if (val == '1') {              // if '1' was received led 13 on
    digitalWrite(ledpin, HIGH);  // turn ON pin 13 on
    delay(1000);                  // waits for a second
    Serial.println("13 on");
  }
  
  
  if (btVal == '0') {              // if '0' was received led 13 is switched off
    digitalWrite(ledpin, LOW);    // turn Off pin 13 off
    delay(1000);                  // waits for a second   
    Serial.println("13 off");
  }
  if (btVal == '1') {              // if '1' was received led 13 on
    digitalWrite(ledpin, HIGH);  // turn ON pin 13 on
    delay(1000);                  // waits for a second
    Serial.println("13 on");
  }

  
  if (btVal && btVal > 0) {
    Serial.write("new Value:");
    Serial.println(btVal);
  }
  if (val && val > 0) {
    BTSerial.println(val);
  }

  delay(200);
}

