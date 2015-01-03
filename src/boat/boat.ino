#include <Servo.h>

const char delimiter[] = ":";
const int HASH_SIZE = 200;

Servo servos[HASH_SIZE];
int pins[HASH_SIZE];

void setup() {                
  Serial.begin(57600);
}

void loop() {
  bool found;
  
  char *val = readLine(&found);
  
  if (!found) {
    delay(1);
    return; 
  }

  Serial.println("value:");
  Serial.println(val);
  
  char * ptr = strtok(val, delimiter);
  char action;
  //strcpy(action, ptr);
  sscanf(ptr, "%c", &action);

  ptr = strtok(NULL, delimiter);
  int pin;
  sscanf(ptr, "%d", &pin);
  
  ptr = strtok(NULL, delimiter);
  int value;
  sscanf(ptr, "%d", &value);
  
  char buffer1[50];
  sprintf(buffer1, "action '%s' pin '%d' value '%d \n",  action, pin, value);
  Serial.println(buffer1); 

  switch (action) {
    case 'p':
      setPin(pin, value);
      break;
    case 's':
      setServo(pin, value);
      break;
    // case 'a': todo analog
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
  
  servo.attach(pin);
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
