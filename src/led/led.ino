
void setup() {
  Serial.begin(115200);
}
 
void loop() {
		
  for (int pin = 1 ; pin <= 100; ++pin) {
    Serial.println(pin);
    
    pinMode(pin, OUTPUT);
    digitalWrite(pin, HIGH);
    
    delay(1000);
    
    digitalWrite(pin, LOW);

  }

  delay(100000);

}

