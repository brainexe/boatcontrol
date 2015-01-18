
#define DEBUG false
#define RADIO_ENABLED false
#define CONFIG "{'baud':57600,'pins':{'5':{'min':5,'max':175,'reverse':false},'6':{'min':5,'max':175,'reverse':true},'13':{}}}"
#define HASH_SIZE 50

#include <ArduinoJson.h>
#include <Servo.h>

#ifdef RADIO_ENABLED == true
  //#include <RH_ASK.h>
  //#include <SPI.h>
#endif

Servo servos[HASH_SIZE];
bool pins[HASH_SIZE];

StaticJsonBuffer<350> jsonBuffer;
JsonObject& config_json = jsonBuffer.parseObject(CONFIG);

void setup() {
  const long baud = config_json["baud"];
  Serial.begin(baud);
}

void loop() {
  char line[15] = "\0";
  int i = readLine(line);

  if (i == 0) {
    delay(2);
    return;
  }

  if (DEBUG) {
    Serial.print("d:");
    Serial.println(line);
  }

  char action;
  int pin;
  int value;

  if (sscanf(line, "%c:%d:%d", &action, &pin, &value) <= 0) {
    //char* pin_string;
    //if (int(pin_id) > 0) {
    //  Serial.println("int");
    //}

    Serial.print("e:invalid:");
    Serial.println(line);
    delay(50);
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

    // todo i2c commands
    
    default:
      Serial.print("e:unknown action: ");
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
  
  JsonObject& pin_config = config_json["pins"]["5"];
  long min = pin_config["min"];
  long max = pin_config["max"];x
  
  if (pin_config["reverse"]) {
   value = 180 - value;
  }
  
  Serial.println(max);
  Serial.println();
  
  if (max > 0) {
    value = map(value, 0, 180, min, max);
  }

  servo.write(value);
}

int readLine(char line[]) {
  char new_char;
  int i = 0;

  while (Serial.available() > 0) {
    delay(1);

    new_char = Serial.read();

    if (new_char == '\n') {
      break;
    }

    line[i++] = new_char;
  }

  return i;
}

