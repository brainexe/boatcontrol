
Schritt 1: Raspbian runterladen und auf Raspberry packen
 - "Expand Filesystem"
 - "Advanced Options" -> SSH -> enable

Schritt 2: Boatcontrol installieren:
 sudo apt-get install -y git
 sudo mkdir /www/ ; sudo chmod 777 /www
 cd /www
 git clone git@github.com:brainexe/boatcontrol.git
 sudo ./scripts/install.sh

Schritt 3: Aliases laden
 echo ". /www/boatcontrol/scripts/alias.sh" >> ~/.bashrc

