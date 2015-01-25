bits_value = 8; // 0-255
bits_pin = 5 // 0-32
bits_action = 3 // 0-8 

value = 254;
pin = 31;
action = 7;
packed_info = (action << (bits_pin+bits_value)) | (pin << bits_value) | value;
console.log(packed_info);


value2 = packed_info & Math.pow(2, bits_value) - 1
pin2 = (packed_info >> bits_pin) & Math.pow(2, bits_pin) - 1
action2 = (packed_info >> (bits_action+bits_pin)) & Math.pow(2, bits_action) - 1

console.log(value2, pin2, action2)


max 2^16 - 1
65535
