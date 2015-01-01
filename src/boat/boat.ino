
#include <Servo.h> 
#include<string.h>
//#include<stdio.h>

int ledPort    = 13;
char delimiter[] = ":";

void setup() {                
  Serial.begin(57600);
}

void loop() {
  char val[20] = "";
  
  char new_char;
  int i = 0;
  bool found = false;
  while (Serial.available() > 0) {
    new_char = Serial.read();
    found = true;
    
    if (new_char == '\n') {
      break;
    }

    val[i] = new_char;

    delay(0.2);
    i++;
  }  
  
  //char * val = readLine(Serial);
  
  if (!found) {
    return; 
  }

Serial.println("value:");
Serial.println(val);
  
  char * ptr = strtok(val, delimiter);
  char * action;
  sscanf(ptr, "%s", &action);
Serial.println(printf("action %s\n", ptr)); 

  ptr = strtok(NULL, delimiter);
  int pin;
  sscanf(ptr, "%d", &pin);
Serial.println(printf("pin %d\n", pin)); 
  
  ptr = strtok(NULL, delimiter);
  int value;
  sscanf(ptr, "%d", &value);
Serial.println(printf("value %d\n", value)); 
  
//Serial.println(printf("action: '%s' '%s' '%d', '%d'\n", action, pin, value, HIGH)); 
setPin(pin, value);
  
  if (action == "pin") {
    setPin(pin, value);
  } else if (action == "servo") {
    setServo(pin, value);
  }
  
}

void setPin(int pin, int value) {
   Serial.println(printf("1: set pin %s %s\n", pin, value)); 
   
   if (pin < 0 || pin > 1000) {
     return;
   }
   
  // todo only once
  pinMode(pin, OUTPUT); 
  digitalWrite(pin, value);
  
  Serial.println(printf("2: set pin %s %s\n", pin, value)); 
}  

void setServo(int pin, int value) {
   Servo servo;
  
   // todo store object
   servo.attach(pin);
   servo.write(value);
}

/*
int in_array(void *array[], int size, void *lookfor, cmpfunc cmp) {
  int i;

  for (i = 0; i < size; i++) {
    if (cmp(lookfor, array[i]) == 0) {
      return 1;
    }
  }  
  return 0;
}

char *readLine(HardwareSerial *serial) {
  char val[80] = "";
  char new_char;
  int i = 0;
  while (serial->available() > 0) {
    new_char = serial->read();
    
    if (new_char == '\n') {
      break;
    }

    val[i] = new_char;

    delay(0.5);
    i++;
  } 
 
  return val; 
}
*/
