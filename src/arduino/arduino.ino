#include <Servo.h>

#define CONFIG "{}"
#define DEBUG true
#define BAUD_RATE 57600

#define HASH_SIZE 150

Servo servos[HASH_SIZE];
int pins[HASH_SIZE];

void setup() {                
  Serial.begin(BAUD_RATE);
}

void loop() {
  
  // todo use readline again
  //char *val = readLine();
  
  char new_char;
  int i = 0;
  char val[15] = "";
  
  while (Serial.available() > 0) {
    delay(2);
    
    new_char = Serial.read();
    if (new_char == '\n') {
      break;
    }

    val[i] = new_char;
     
    i++;
  }
  
  // end readLine()
  
  if (strlen(val) <= 1) {
    return; 
  }
  
  if (DEBUG) {  
    Serial.println("value:");
    Serial.println(val);
  }
  
  char action;
  int pin;
  int value;
  
  if (sscanf(val, "%c:%d:%d", &action, &pin, &value) <= 0) {
    Serial.println("invalid value");
    delay(100); 
  }

  if (DEBUG) {
    char buffer[50] = "";
    sprintf(buffer, "action '%c' pin '%d' value '%d' \n",  action, pin, value);
    Serial.println(buffer); 
  }
  
  switch (action) {
    case 'd':
      // digital
      return setDigital(pin, value);
    
    case 's':
      // servo
      return setServo(pin, value);
    
    case 'p':
    case 'a':
      return setAnalog(pin, value);
      
    default:
      Serial.print("unknown action : "); 
      Serial.println(action);
  }
  
}

void setDigital(int pin, int value) {  
  // todo set pin mode only once
  if (pins[pin] == 0) {
    pinMode(pin, OUTPUT);   
    pins[pin] = 1;
  }
  
  digitalWrite(pin, value);
}

void setAnalog(int pin, int value) {  
  // todo set pin mode only once
  if (pins[pin] == 0) {
    pinMode(pin, OUTPUT);   
    pins[pin] = 1;
  }
  
  analogWrite(pin, value);
}  

void setServo(int pin, int value) {
  Servo servo;
  servo = servos[pin];
  
  if (!servo.attached()) {
    servo.attach(pin);
  }
  
  servo.write(value);
}

char *readLine() {
  char new_char;
  int i = 0;
  char val[15] = "";
  
  while (Serial.available() > 0) {
    delay(1);
    
    new_char = Serial.read();
    
    if (new_char == '\n') {
      break;
    }

    val[i] = new_char;
    
    i++;
  }
  
  return val;
}