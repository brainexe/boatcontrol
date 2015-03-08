class dev {

  include nodejs

  $packages = [
    "curl", "make", "g++", "wget", "vim", "build-essential", "espeak", "whois", "lolcat",

    "git", "git-svn"
    "dstat", "htop", "iotop", "strace", "screen",
    
     # PS3 controller
    "bluez-utils", "bluez-compat", "bluez-hcidump", "checkinstall", "libusb-dev", "libbluetooth-dev", "joystick", "libusbhid-common"
  ]

  package { $packages: ensure => "installed" }

}
