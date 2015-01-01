
#include <SoftwareSerial.h>

SoftwareSerial Genotronex(63, 64); // RX, TX
int ledpin = 13; // led on D13 will show blink on / off
int BluetoothData; // the data given from Computer

void setup() {
  // put your setup code here, to run once:
  Genotronex.begin(9600);
  Genotronex.println("Bluetooth On please press 1 or 0 blink LED ..");
  pinMode(ledpin,OUTPUT);
  
  Serial.begin(115200);
}

void loop() {
  // put your main code here, to run repeatedly:
  if (Genotronex.available()){
    Serial.println("available");
    BluetoothData=Genotronex.read();
    Serial.println(BluetoothData);
    
    if(BluetoothData=='1'){   // if number 1 pressed ....
      digitalWrite(ledpin,1);
      Serial.println("13 on");
      Genotronex.println("LED  On D13 ON ! ");
    }
    if (BluetoothData=='0'){// if number 0 pressed ....
      digitalWrite(ledpin,0);
      Serial.println("13 off");
      Genotronex.println("LED  On D13 Off ! ");
    }
  } else {
    Serial.println(":(");
  }
  Genotronex.println("?");
  delay(100);// prepare for next data ...
}
