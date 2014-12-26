
#include <Servo.h> 

int servoPort = 37;
int potiPort  = 15;
int ledPort   = 13;

Servo myservo;

void setup() {                
  pinMode(ledPort, OUTPUT);
  pinMode(potiPort, INPUT);
  
  myservo.attach(servoPort);
  
  Serial.begin(115200);
  Serial.println("hello");
}

void loop() {
  int val;

  val = analogRead(potiPort); 
  val = map(val, 0, 1023, 0, 180);
  
  //Serial.println(degree);
  
  myservo.write(val);
  
  digitalWrite(ledPort, HIGH);
  delay(250);
  digitalWrite(ledPort, LOW);
  delay(250);
}
