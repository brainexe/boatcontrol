
char val;         // variable to receive data from the serial port
int ledpin = 13;

void setup()
{
  pinMode(ledpin, OUTPUT);
  Serial.begin(115200);       // start serial communication at 115200bps
}
 
void loop() {
  if( Serial.available() )       // if data is available to read
  {;}
    val = Serial.read();         // read it and store it in 'val'
 
  if( val == '0' ) {              // if '0' was received led 13 is switched off
    digitalWrite(ledpin, LOW);    // turn Off pin 13 off
    delay(1000);                  // waits for a second   
    Serial.println("13 off");
  }

  if (val == '1' ) {              // if '1' was received led 13 on
    digitalWrite(ledpin = 13, HIGH);  // turn ON pin 13 on
    delay(1000);                  // waits for a second
    Serial.println("13 on");
  }
}

