
#include <Servo.h> 
#include<string.h>

char delimiter[] = ":";

Servo servo;

void setup() {                
  Serial.begin(57600);
  // todo store object
   servo.attach(37);
}

void loop() {
  char buffer[50];
  char val[50] = "";
  
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

    delay(2);
    i++;
  }
  
  if (!found) {
    return; 
  }

Serial.println("value:");
Serial.println(val);
  //return;
  
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

  if (action == 'p') {
    Serial.println("set pin");
    setPin(pin, value);
  } else if (action == 's') {
    Serial.println("set servo");
    setServo(pin, value);
  } else {
    sprintf(buffer, "unknown action %s", action);
    Serial.println(buffer); 
  }
  
}

void setPin(int pin, int value) {  
  if (pin <= 0 || pin > 1000) {
    return;
  }
   
char buffer[50] = "";  
sprintf(buffer, "set pin %d %d\n", pin, value);
Serial.println(buffer); 
   
  // todo only once
  pinMode(pin, OUTPUT); 
  digitalWrite(pin, value);
  
//Serial.println(F("2: set pin %s %s\n"), pin, value);
    
}  

void setServo(int pin, int value) {

char buffer[50] = "";  
sprintf(buffer, "set servo %d %d\n", pin, value);
Serial.println(buffer); 
    
  /*
  Servo servo2;
  servo2.attach(pin);
  servo2.write(value);
  delay(20);
  servo2.detach();
  */
  servo.write(value);
}

/*

char *readLine() {
  char val[80] = "";
  char new_char;
  int i = 0;
  while (Serial.available() > 0) {
    new_char = Serial.read();
    
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
