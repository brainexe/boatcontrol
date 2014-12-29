char val;
char btVal;

int ledpin = 13;

int enPin  = 5;
int rxPin  = 15; // TODO
int txPin  = 14; // TODO

int resetPin = 5; // TODO
int PIO11Pin = 8; // TODO
int RTSPin   = 4; // TODO

#include <SoftwareSerial.h>

SoftwareSerial BTSerial(rxPin, txPin); // RX | TX

void setup() {
  pinMode(ledpin, OUTPUT);
  
  pinMode(rxPin, INPUT);
  pinMode(txPin, OUTPUT);
  
  
  pinMode(PIO11Pin, OUTPUT);
  digitalWrite(PIO11Pin, HIGH);
  pinMode(resetPin, OUTPUT);
  digitalWrite(resetPin, LOW);
  pinMode(RTSPin, INPUT);

  /*
  BTSerial.begin(115200);  // The Bluetooth Mate defaults to 115200bps
  BTSerial.print("$");  // Print three times individually
  BTSerial.print("$");
  BTSerial.print("$");  // Enter command mode
  */
  
  BTSerial.begin(9600);
  
  Serial.begin(9600);
  
  setupBlueToothConnection();
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
    BTSerial.println("on");
  }
  
  
  if (btVal && btVal > -1) {
    Serial.write("new Value:");
    Serial.println(btVal);
  }
  if (val && val >= 0) {
    BTSerial.println(val);
  }

  delay(200);
}


void setupBlueToothConnection() {
  enterATMode();
  sendATCommand();
  sentATCommand("UART=9600,0,0");
  sentATCommand("ROLE=0");
  enterComMode();
}
 
void enterATMode() {
  BTSerial.flush();
  delay(500);
  digitalWrite(PIO11Pin, HIGH);
  resetBT();
  delay(500);
  BTSerial.begin(9600);
} 

void resetBT() {
  digitalWrite(resetPin, LOW);
  delay(2000);
  digitalWrite(resetPin, HIGH);
}

void sendATCommand() {
  BTSerial.print("AT\r\n");
  delay(100);
}

void sentATCommand(char *command) {
  BTSerial.print("AT");
  if(strlen(command) > 1){
  BTSerial.print("+");
  BTSerial.print(command);
  delay(100);
  }
  BTSerial.print("\r\n");
}

void enterComMode() {
  BTSerial.flush();
  delay(500);
  digitalWrite(PIO11Pin, LOW);
  resetBT();
  delay(500);
  BTSerial.begin(9600);
}

