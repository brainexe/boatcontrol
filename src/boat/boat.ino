
#include <Servo.h> 
#include<string.h>
#include<stdio.h>

int ledPort    = 13;
char delimiter[] = ":";

void setup() {                
  Serial.begin(57600);
}

void loop() {
  char val[80] = "";
  char new_char;
  int i = 0;
  while (Serial.available() > 0) {
    new_char = Serial.read();
    
    if (new_char == '\n') {
      break;
    }

    val[i] = new_char;

    delay(0.2);
    i++;
  }  
  
  if (val == "") {
    return; 
  }

  Serial.println(val);

  char * action = strtok(val, delimiter);
  Serial.println(printf("action %s", value)); 

  char * pin = strtok(val, delimiter);
  Serial.println(printf("pin %s", value)); 
  
  char * value = strtok(val, delimiter);
  Serial.println(printf("value %s", value)); 
  
  if (action == "pin") {
    //setPin(pin, value) 
  }
  delay(1000);
}

void setPin(int pin, int value) {
  // todo only once
  pinMode(pin, OUTPUT); 
  digitalWrite(pin, value);
}  

void setServo(int pin, int value) {
   Servo servo;
  
   // todo store object
   servo.attach(pin);
   servo.write(value);
}
