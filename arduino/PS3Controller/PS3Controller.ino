// https://github.com/jvpernis/esp32-ps3

#include <Ps3Controller.h>
#include <BLEDevice.h>

#include <SPI.h>
#include <NRFLite.h>


// controller
#define ANALOG_BUTTONS false
int player = 0;
int battery = 0;

// BT
#define CONTROLLER_MAC "24:0a:c4:5f:fa:92"

// NRF24
#define REQUIRE_ACK NRFLite::REQUIRE_ACK
const static uint8_t RADIO_ID = 1;             // Our radio's id.
const static uint8_t DESTINATION_RADIO_ID = 0; // Id of the radio we will transmit to.
const static uint8_t PIN_RADIO_CE = 2;
const static uint8_t PIN_RADIO_CSN = 4;

const static uint TYPE_DEBUG = 0;
const static uint TYPE_LOG = 1;
const static uint TYPE_ERROR = 2;
const static uint TYPE_CONTROLLER = 3;

struct RadioPacket // Any packet up to 32 bytes can be sent.
{
    uint8_t FromRadioId;
    uint8_t Type;
    char Message[30];
};

NRFLite _radio;
RadioPacket _radioData;

char logString[30];

void notify()
{
    //--- Digital cross/square/triangle/circle button events ---
    if (Ps3.event.button_down.cross)
        send(TYPE_CONTROLLER, "x:press");
    else if (Ps3.event.button_up.cross)
        send(TYPE_CONTROLLER, "x:release");

    if (Ps3.event.button_down.square)
        send(TYPE_CONTROLLER, "x:press");
    else if (Ps3.event.button_up.square)
        send(TYPE_CONTROLLER, "x:square");

    if (Ps3.event.button_down.triangle)
        send(TYPE_CONTROLLER, "triangle:press");
    else if (Ps3.event.button_up.triangle)
        send(TYPE_CONTROLLER, "triangle:release");

    if (Ps3.event.button_down.circle)
        send(TYPE_CONTROLLER, "circle:press");
    else if (Ps3.event.button_up.circle)
        send(TYPE_CONTROLLER, "circle:release");

    //--------------- Digital D-pad button events --------------
    if (Ps3.event.button_down.up)
        send(TYPE_CONTROLLER, "dpadUp:press");
    else if (Ps3.event.button_up.up)
        send(TYPE_CONTROLLER, "dpadUp:release");

    if (Ps3.event.button_down.right)
        send(TYPE_CONTROLLER, "dpadRight:press");
    else if (Ps3.event.button_up.right)
        send(TYPE_CONTROLLER, "dpadRight:release");

    if (Ps3.event.button_down.down)
        send(TYPE_CONTROLLER, "dpadDown:press");
    else if (Ps3.event.button_up.down)
        send(TYPE_CONTROLLER, "dpadDown:release");

    if (Ps3.event.button_down.left)
        send(TYPE_CONTROLLER, "dpadLeft:press");
    else if (Ps3.event.button_up.left)
        send(TYPE_CONTROLLER, "dpadLeft:release");

    //------------- Digital shoulder button events -------------
    if (Ps3.event.button_down.l1)
        send(TYPE_CONTROLLER, "l1:press");
    else if (Ps3.event.button_up.l1)
        send(TYPE_CONTROLLER, "l1:release");

    if (Ps3.event.button_down.r1)
        send(TYPE_CONTROLLER, "r1:press");
    else if (Ps3.event.button_up.r1)
        send(TYPE_CONTROLLER, "r1:release");

    //-------------- Digital trigger button events -------------
    if (Ps3.event.button_down.l2)
        send(TYPE_CONTROLLER, "l2:press");
    else if (Ps3.event.button_up.l2)
        send(TYPE_CONTROLLER, "l2:release");

    if (Ps3.event.button_down.r2)
        send(TYPE_CONTROLLER, "r2:press");
    else if (Ps3.event.button_up.r2)
        send(TYPE_CONTROLLER, "r2:release");

    //--------------- Digital stick button events --------------
    if (Ps3.event.button_down.l3)
        send(TYPE_CONTROLLER, "l3:press");
    else if (Ps3.event.button_up.l3)
        send(TYPE_CONTROLLER, "l3:release");

    if (Ps3.event.button_down.r3)
        send(TYPE_CONTROLLER, "r3:press");
    else if (Ps3.event.button_up.r3)
        send(TYPE_CONTROLLER, "r3:release");

    //---------- Digital select/start/ps button events ---------
    if (Ps3.event.button_down.select)
        send(TYPE_CONTROLLER, "select:press");
    else if (Ps3.event.button_up.select)
        send(TYPE_CONTROLLER, "select:release");

    if (Ps3.event.button_down.start)
        send(TYPE_CONTROLLER, "start:press");
    else if (Ps3.event.button_up.start)
        send(TYPE_CONTROLLER, "start:release");

    if (Ps3.event.button_down.ps)
        send(TYPE_CONTROLLER, "psx:press");
    else if (Ps3.event.button_up.ps)
        send(TYPE_CONTROLLER, "psx:release");

    //---------------- Analog stick value events ---------------
   if (abs(Ps3.event.analog_changed.stick.lx) + abs(Ps3.event.analog_changed.stick.ly) > 1) {
       sprintf(logString,"left:move:%d:%d", Ps3.data.analog.stick.lx, Ps3.data.analog.stick.ly);
       send(TYPE_CONTROLLER, logString);
    }

   if (abs(Ps3.event.analog_changed.stick.rx) + abs(Ps3.event.analog_changed.stick.ry) > 1){
       sprintf(logString,"right:move:%d:%d", Ps3.data.analog.stick.rx, Ps3.data.analog.stick.ry);
       send(TYPE_CONTROLLER, logString);
   }

   //--------------- Analog D-pad button events ----------------
   if (ANALOG_BUTTONS) {
       if (abs(Ps3.event.analog_changed.button.up)){
           Serial.print("Pressing the up button: ");
           Serial.println(Ps3.data.analog.button.up, DEC);
       }

       if (abs(Ps3.event.analog_changed.button.right)){
           Serial.print("Pressing the right button: ");
           Serial.println(Ps3.data.analog.button.right, DEC);
       }

       if (abs(Ps3.event.analog_changed.button.down)){
           Serial.print("Pressing the down button: ");
           Serial.println(Ps3.data.analog.button.down, DEC);
       }

       if (abs(Ps3.event.analog_changed.button.left)){
           Serial.print("Pressing the left button: ");
           Serial.println(Ps3.data.analog.button.left, DEC);
       }

       //---------- Analog shoulder/trigger button events ----------
       if (abs(Ps3.event.analog_changed.button.l1)){
           Serial.print("Pressing the left shoulder button: ");
           Serial.println(Ps3.data.analog.button.l1, DEC);
       }

       if (abs(Ps3.event.analog_changed.button.r1)){
           Serial.print("Pressing the right shoulder button: ");
           Serial.println(Ps3.data.analog.button.r1, DEC);
       }

       if (abs(Ps3.event.analog_changed.button.l2)){
           Serial.print("Pressing the left trigger button: ");
           Serial.println(Ps3.data.analog.button.l2, DEC);
       }

       if (abs(Ps3.event.analog_changed.button.r2)){
           Serial.print("Pressing the right trigger button: ");
           Serial.println(Ps3.data.analog.button.r2, DEC);
       }

       //---- Analog cross/square/triangle/circle button events ----
       if (abs(Ps3.event.analog_changed.button.triangle)){
           Serial.print("Pressing the triangle button: ");
           Serial.println(Ps3.data.analog.button.triangle, DEC);
       }

       if (abs(Ps3.event.analog_changed.button.circle)){
           Serial.print("Pressing the circle button: ");
           Serial.println(Ps3.data.analog.button.circle, DEC);
       }

       if (abs(Ps3.event.analog_changed.button.cross)){
           Serial.print("Pressing the cross button: ");
           Serial.println(Ps3.data.analog.button.cross, DEC);
       }

       if (abs(Ps3.event.analog_changed.button.square)){
           Serial.print("Pressing the square button: ");
           Serial.println(Ps3.data.analog.button.square, DEC);
       }
    }

   //---------------------- Battery events ---------------------
    if (battery != Ps3.data.status.battery){
        battery = Ps3.data.status.battery;
        if (battery == ps3_status_battery_charging)      send(TYPE_CONTROLLER, "battery:charging");
        else if (battery == ps3_status_battery_full)     send(TYPE_CONTROLLER, "battery:full");
        else if (battery == ps3_status_battery_high)     send(TYPE_CONTROLLER, "battery:high");
        else if (battery == ps3_status_battery_low)      send(TYPE_CONTROLLER, "battery:low");
        else if (battery == ps3_status_battery_dying)    send(TYPE_CONTROLLER, "battery:dying");
        else if (battery == ps3_status_battery_shutdown) send(TYPE_CONTROLLER, "battery:shutdown");
        else send(TYPE_CONTROLLER, "battery:undefined");
    }
}

void onConnect(){
    send(TYPE_CONTROLLER, "connectedConnected");
}

void setup()
{
    Serial.begin(BAUD_RATE);
    Serial.println("TX: start");

//    BLEDevice::createServer();
//    BLEAddress thisAddress = BLEDevice::getAddress();
//    Serial.printf("BLE address: %s\n", thisAddress.toString().c_str());

    if (!_radio.init(RADIO_ID, PIN_RADIO_CE, PIN_RADIO_CSN)) {
        Serial.println("Cannot communicate with radio");
        while (1); // Wait here forever.
    }

    _radioData.FromRadioId = RADIO_ID;

    Ps3.attach(notify);
    Ps3.attachOnConnect(onConnect);
    Ps3.begin(CONTROLLER_MAC);

    Serial.println("TX: Ready.");
    send(TYPE_DEBUG, "start");
}

void loop()
{
    if (!Ps3.isConnected()) {
        return;
    }

    player += 1;
    if (player > 10) {
        player = 0;
    }
    Ps3.setPlayer(player);

    send(TYPE_DEBUG, "ping");
    delay(5000);
}


void send(uint8_t type, String msg) {
    _radioData.Type = type;

    msg.toCharArray(_radioData.Message, msg.length() + 1);

    if (_radio.send(DESTINATION_RADIO_ID, &_radioData, sizeof(_radioData), REQUIRE_ACK)) {
        Serial.println("TX Failed: " + msg);
    }

    Serial.println(msg);
}

void setRumble() {
  ps3_cmd_t cmd = {0};

  cmd.rumble_left_intensity = 0xff;
  cmd.rumble_right_intensity = 0xff;
  
  cmd.rumble_right_duration = 10;
  cmd.rumble_left_duration = 1;
    
  ps3Cmd(cmd);
}
