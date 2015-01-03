#include <Servo.h>

#define CONFIG "{}"
#define DEBUG true
#define BAUD_RATE 57600

#define HASH_SIZE 200

Servo servos[HASH_SIZE];
int pins[HASH_SIZE];

void setup() {                
  Serial.begin(BAUD_RATE);
}

void loop() {
  bool found;
  char *val = readLine(&found);
  
  if (!found) {
    delay(1);
    return; 
  }

  if (DEBUG) {  
    Serial.println("value:");
    Serial.println(val);
  }
  
  char action;
  int pin;
  int value;
  
  sscanf(val, "%c:%d:%d", &action, &pin, &value);

  if (DEBUG) {
    char buffer[50] = "";
    sprintf(buffer, "action '%s' pin '%d' value '%d \n",  action, pin, value);
    Serial.println(buffer); 
  }
  
  switch (action) {
    case 'd':
      // digital
      return setPin(pin, value);
    case 's':
      // servo
      return setServo(pin, value);
    // case 'a': todo analog
    // case 'p': todo pwm
    default:
      Serial.print("unknown action : "); 
      Serial.println(action);
  }
  
}

void setPin(int pin, int value) {  
  // todo set pin mode only once
  if (pins[pin] == 0) {
    pinMode(pin, OUTPUT);   
    pins[pin] = 1;
  }
  
  digitalWrite(pin, value);
}  

void setServo(int pin, int value) {
  Servo servo;
  servo = servos[pin];
  
  if (!servo.attached()) {
    servo.attach(pin);
  }
  
  servo.write(value);
}

char *readLine(bool *found) {
  char new_char;
  int i = 0;
  char val[15] = "";
  
  while (Serial.available() > 0) {
    new_char = Serial.read();
    *found = true;
    
    if (new_char == '\n') {
      break;
    }

    val[i] = new_char;

    delay(1);
    i++;
  }
  
  return val;
}
