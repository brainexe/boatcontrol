/* Copyright (C) 2012 Kristian Lauszus, TKJ Electronics. All rights reserved.

 This software may be distributed and modified under the terms of the GNU
 General Public License version 2 (GPL2) as published by the Free Software
 Foundation and appearing in the file GPL2.TXT included in the packaging of
 this file. Please note that GPL2 Section 2[b] requires that all works based
 on this software must also be made publicly available under the terms of
 the GPL2 ("Copyleft").

 Contact information
 -------------------

 Kristian Lauszus, TKJ Electronics
 Web      :  http://www.tkjelectronics.com
 e-mail   :  kristianl@tkjelectronics.com
 */

#include <stdint.h>
#include "PS3BT.h"
// To enable serial debugging see "settings.h"
//#define EXTRADEBUG // Uncomment to get even more debugging data
//#define PRINTREPORT // Uncomment to print the report send by the PS3 Controllers

PS3BT::PS3BT(uint8_t btadr5, uint8_t btadr4, uint8_t btadr3, uint8_t btadr2, uint8_t btadr1, uint8_t btadr0) :
pBtd(p) // pointer to USB class instance - mandatory
{

}

bool PS3BT::getButtonPress(ButtonEnum b) {

}

bool PS3BT::getButtonClick(ButtonEnum b) {

}

uint8_t PS3BT::getAnalogButton(ButtonEnum a) {

}

uint8_t PS3BT::getAnalogHat(AnalogHatEnum a) {

}

int16_t PS3BT::getSensor(SensorEnum a) {

}

double PS3BT::getAngle(AngleEnum a) {
 
}

double PS3BT::get9DOFValues(SensorEnum a) { // Thanks to Manfred Piendl

}

String PS3BT::getTemperature() {

}

bool PS3BT::getStatus(StatusEnum c) {

}

void PS3BT::printStatusString() {

}

void PS3BT::Reset() {

}

void PS3BT::disconnect() { // Use this void to disconnect any of the controllers

}


void PS3BT::Run() {

}

/************************************************************/
/*                    HID Commands                          */
/************************************************************/

// Playstation Sixaxis Dualshock and Navigation Controller commands

void PS3BT::HID_Command(uint8_t* data, uint8_t nbytes) {

}

void PS3BT::setAllOff() {
        HIDBuffer[3] = 0x00; // Rumble bytes
        HIDBuffer[4] = 0x00;
        HIDBuffer[5] = 0x00;
        HIDBuffer[6] = 0x00;

        HIDBuffer[11] = 0x00; // LED byte

        HID_Command(HIDBuffer, HID_BUFFERSIZE);
}

void PS3BT::setRumbleOff() {

}

void PS3BT::setRumbleOn(RumbleEnum mode) {

}

void PS3BT::setRumbleOn(uint8_t rightDuration, uint8_t rightPower, uint8_t leftDuration, uint8_t leftPower) {

}

void PS3BT::setLedRaw(uint8_t value) {

}

void PS3BT::setLedOff(LEDEnum a) {

}

void PS3BT::setLedOn(LEDEnum a) {

}

void PS3BT::setLedToggle(LEDEnum a) {

}

void PS3BT::enable_sixaxis() { // Command used to enable the Dualshock 3 and Navigation controller to send data via Bluetooth

}

// Playstation Move Controller commands

void PS3BT::HIDMove_Command(uint8_t* data, uint8_t nbytes) {

}

void PS3BT::moveSetBulb(uint8_t r, uint8_t g, uint8_t b) { // Use this to set the Color using RGB values

}

void PS3BT::moveSetBulb(ColorsEnum color) { // Use this to set the Color using the predefined colors in enum

}

void PS3BT::moveSetRumble(uint8_t rumble) {

}

void PS3BT::onInit() {

}
