
#include <SPI.h>
#include <NRFLite.h>

#include "./shared.h"

const static uint8_t RADIO_ID = 0;       // Our radio's id.  The transmitter will send to this id.
const static uint8_t PIN_RADIO_CE = 9;
const static uint8_t PIN_RADIO_CSN = 10;

NRFLite _radio;
RadioPacket _radioData;

void setup() {
  Serial.begin(BAUD_RATE);
  Serial.println("debug:RX start...");

  if (!_radio.init(RADIO_ID, PIN_RADIO_CE, PIN_RADIO_CSN)) {
    Serial.println("error:Cannot communicate with radio...please restart");
    while (1);
  }

  Serial.println("debug:RX connected to TX...");
}

void loop()
{
  while (_radio.hasData())
  {
    _radio.readData(&_radioData);

    switch (_radioData.Type) {
      case TYPE_CONTROLLER:
        Serial.print("controller:");
        break;
      case TYPE_DEBUG:
        Serial.print("debug:");
        break;
      case TYPE_ERROR:
        Serial.print("error:");
        break;
      default:
        Serial.print("unknown:");
        break;
    }

    Serial.println(_radioData.Message);
  }
}
