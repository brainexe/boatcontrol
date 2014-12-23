
Gesteuert soll es mit einem PS3-Controller.
1. Die wichtigste Funktion ist natürlich der Antrieb. Dieser erfogt über einen Fartenregler und einen Servo. Beide werden Hard- und Softwarmäßig gleich angesteuert.
1.1. mögliche Trimmung (anpassung der Servo-Stellung in 0-Position)
1.2. Um Mittelstellung der Steuerknüppel noch ein wenig "O-Position", damit der Motor nicht schon bei leichter "Fehlstellung" des Sticks dauerhaft Strom zieht.
2. Des weiteren kommt noch die Ansteiuerung des Löschmonitors dazu - spähter alle 3. Dazu gibt es schon eine Pumpe. Für die anderen zwei kommt eine weitere dazu. Beweglich ist der eine Monitor bisher nur über einen Servo in der "Panorama"-Richtung (links/rechts); als zusatz ist die "Tilt"-Richtung (hoch/runter) geplant - ebenfalls mit einem Servo. Die Pumpen will ich direkt über die integrierten Mosfets anschließen.
3. Durch den Wassermelder soll eine zusätzliche, 3. Pumpe (Lenz-Pumpe) eingeschaltet werden, um das Boot wieder auszupumpen. Zusätzlich signal an Controller (Vibration) und ansteuerung einer zusätzlichen LED oder Blinken der Beleuchtung.
4. Spannungsüberwachung des Akkus und Warnmeldung. Messung wahrscheinlich über einen Spannungsteiler an einem Analogen Eingang. Meldung ebenfalls an den Controller bei unterschreitung (evtl Pulsierend - unter xV mit 1Hz und noch geringere Spannung mit 2Hz)
5. Das Soundmodul und die dazugehörigen Blinklichter sollen über einen Mosfet eingeschaltet werden (Blinklichter haben zusätzlich eigene Elektronik zum Blinken)
6. Die Restliche Beleuchtung soll ebenfalls über einen Mosfet eingeschaltet werden.
7. Temperaturen von Motor und Fahrtenregler überwachen, über Analogeingang - welcher schon auf dem Board extra für Termofühler vorbereitet ist.
8. Ein Display, um Fehlermeldungen, etc einzustellen, evtl über taster auch eine Handfunktion, um in der "Werft" einzelne Funktionen zu Testen - Kann aber auch nachträglich noch eingebunden werden.

Später sollen auch noch andere Funktionen kommen. Welche Funktion auf welchen Eingang vom Controller kommt, steht noch nicht fest, kann aber normalerweiser auch nachträglich noch recht einfach geänder werden.

Zur Unterstützung bei der Programierung gibt es eine Libary (im Anhang), welche ich auch schon bei mir installiert habe.
Die Firmware für den 3D-Drucker habe ich auch mal in den Anhang geladen, um ein Paar Ideen zur Programierung zu übernehmen.

Bei Fragen oder Anmerkungen kannst du dich gerne melden.

Als Bluetooth-Empfänger (hoffentlich auch mit ausreichend Reichweite) habe ich folgendes überlegt, da das USB-Host-Shield, wofür die ganzen erklährungen sind, nicht auf das RUMBA-Board passt:
Serial HC-05 Wireless Bluetooth Transceiver (Host-Slave integration) CP06011 H24

Wassermelder:
Wasser-Leck- Sensor-Detektor Wassermelder , Leckwarner , Wasseralarm

Display:
3D Printer RAMPS1.4 LCD12864 Steuerung Bedienfeld 12864 controller Panel Board
http://www.ebay.de/itm/371209403665?_trksid=p2055119.m1438.l2649&ssPageName=STRK%3AMEBIDX%3AIT


Anbindung vom PS3-Controller:
Using a USB host shield and a Bluetooth dongle to get data from a PS3 controller - Success!

Als "Arduino" habe ich folgendes Board, welches über die Arduino-Software programmiert werden kann:
http://reprap.org/wiki/RUMBA
