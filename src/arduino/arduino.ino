
#define DEBUG false
#define RADIO_ENABLED false
#define CONFIG "{'baud':57600}"
#define HASH_SIZE 50

#include <ArduinoJson.h>
#include <Servo.h>

#if RADIO_ENABLED
  //#include <VirtualWire.h>
#endif

Servo servos[HASH_SIZE];
bool pins[HASH_SIZE];

StaticJsonBuffer<100> jsonBuffer;
JsonObject& config_json = jsonBuffer.parseObject(CONFIG);
  
void setup() {
  const long baud = config_json["baud"];
  Serial.begin(baud);
  
  //const char* debug = config_json["debug"];
}

void loop() {
  // todo use readline again
  //String val2 = readLine();
  
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
    Serial.print("d:");
    Serial.println(val);
  }
  
  char action;
  String pin_id;
  int pin;
  int value;
  
  if (sscanf(val, "%c:%d:%s:%d", &action, &pin, &pin_id, &value) <= 0) {
    Serial.print("d:invalid:");
    Serial.println(val);
    delay(100); 
  }

  if (DEBUG) {
    char buffer[50] = "";
    sprintf(buffer, "d:action '%c' pin '%d' value '%d'",  action, pin, value);
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
      Serial.print("d:unknown action: ");
      Serial.println(action);
  }  
}

void setDigital(int pin, int value) {
  if (pins[pin] == false) {
    pinMode(pin, OUTPUT);   
    pins[pin] = true;
  }
  
  digitalWrite(pin, value);
}

void setAnalog(int pin, int value) {
  if (pins[pin] == false) {
    pinMode(pin, OUTPUT);   
    pins[pin] = true;
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

String readLine() {
  char new_char;
  int i = 0;
  String val = "";
  
  while (Serial.available() > 0) {
    delay(1);
    
    new_char = Serial.read();
    
    if (new_char == '\n') {
      break;
    }

    val += new_char;
    
    i++;
  }
  
  return val;
}

