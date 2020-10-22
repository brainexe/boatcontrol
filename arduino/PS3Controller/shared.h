const static uint TYPE_DEBUG = 0;
const static uint TYPE_LOG = 1;
const static uint TYPE_ERROR = 2;
const static uint TYPE_CONTROLLER = 3;

#define BAUD_RATE 115200

struct RadioPacket // Any packet up to 32 bytes can be sent.
{
    uint8_t FromRadioId;
    uint8_t Type;
    char Message[30];
};