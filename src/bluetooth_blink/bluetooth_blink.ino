
#include <SoftwareSerial.h>

char val;
char btVal;

int ledPin = 13;

int rxPin  = 15; // TODO
int txPin  = 14; // TODO

int resetPin = 1005; // TODO
int PIO11Pin = 1008; // TODO
int RTSPin   = 1004; // TODO


SoftwareSerial BTSerial(rxPin, txPin); // RX | TX

void setup() {
  pinMode(ledPin, OUTPUT);
  
  pinMode(rxPin, INPUT);
  pinMode(txPin, OUTPUT);
  
  pinMode(PIO11Pin, OUTPUT);
  digitalWrite(PIO11Pin, HIGH);
  pinMode(resetPin, OUTPUT);
  digitalWrite(resetPin, LOW);
  pinMode(RTSPin, INPUT);

  BTSerial.begin(9600);
  Serial.begin(9600);
  
  Serial.print("booting...");
  setupBlueToothConnection();
  Serial.println("done!");
}

void loop() {
  val   = Serial.read();
  btVal = BTSerial.read(); 

  if (val == '0' || btVal == '0') {
    digitalWrite(ledPin, LOW);
    Serial.println("off");
    BTSerial.println("off");
  }
  if (val == '1' || btVal == '1') { 
    digitalWrite(ledPin, HIGH);
    Serial.println("on");
    BTSerial.println("on");
  }
  
  if (btVal && btVal >= 0) {
    Serial.write("new Value:");
    Serial.println(btVal);
  }
  if (val && val >= 0) {
    BTSerial.println(val);
  }

  delay(250);
}


void setupBlueToothConnection() {
  enterATMode();
  sendATCommand();
  sentATCommand("INIT");
  sentATCommand("UART=9600,0,0");
  //sendATCommand("INQM=1,9,48");
  sentATCommand("ROLE=1");
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
  delay(1000);
  digitalWrite(resetPin, HIGH);
}

void sendATCommand() {
  BTSerial.print("AT\r\n");
  delay(100);
}

void sentATCommand(char *command) {
  BTSerial.print("AT");
  if (strlen(command) > 1) {
    BTSerial.print("+");
    BTSerial.print(command);
    delay(100);
  }
  BTSerial.print("\r\n");
}

void enterComMode() {
  BTSerial.flush();
  delay(250);
  digitalWrite(PIO11Pin, LOW);
  resetBT();
  delay(250);
  BTSerial.begin(9600);
}

String getInput(HardwareSerial serial) {
  String string = "";
  
  while (serial.available() >= 0) {
   string += serial.read(); 
  }
 
  return string;
}  

